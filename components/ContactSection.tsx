'use client';

import { useEffect, useRef, useState } from 'react';

const COMMON_DOMAINS = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'icloud.com'];
const TEMP_EMAIL_DOMAINS = [
  'tempmail', '10minutemail', 'mailinator', 'guerrillamail', 'yopmail', 'dispostable', 'maildrop', 'fakeinbox', 'trashmail'
];

// Always show the next 7 days starting from today
function getNext7Days() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }
  return days;
}

function convertISTtoLocal(istTime: string, date: Date, userTimeZone: string) {
  const [time, modifier] = istTime.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const istDate = new Date(date);
  istDate.setHours(hours, minutes, 0, 0);

  const utcString = istDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  const utcDate = new Date(utcString);

  const localTimeString = utcDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: userTimeZone,
    timeZoneName: 'short'
  });

  const localTimeParts = localTimeString.split(' ');
  const timeZoneAbbr = localTimeParts.pop();
  const localTime = localTimeParts.join(' ');

  return `${localTime} (${timeZoneAbbr})`;
}

// Helper to convert 12h time to 24h
function convertTo24Hour(time12h: string) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function isValidName(name: string) {
  return /^[a-zA-Z\s]{2,}$/.test(name.trim());
}

function isValidPhone(phone: string) {
  return /^(\+?\d[\d\s-]{8,14}\d)$/.test(phone.trim());
}

function isTempEmail(email: string) {
  const domain = email.split('@')[1]?.toLowerCase() || '';
  return TEMP_EMAIL_DOMAINS.some(tempDomain =>
    domain === tempDomain || domain.endsWith('.' + tempDomain)
  );
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && !isTempEmail(email);
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    attendeeEmails: [] as string[],
    date: '',
    time: '',
    timezone: '',
  });
  const [attendeeInput, setAttendeeInput] = useState('');
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  const [filteredDomains, setFilteredDomains] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [meetingLink, setMeetingLink] = useState<string | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const next7Days = getNext7Days();
  const [selectedDate, setSelectedDate] = useState(next7Days[0]);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [userTimeZone, setUserTimeZone] = useState('Asia/Kolkata');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const attendeeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.timezone) setUserTimeZone(data.timezone);
      });
  }, []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: selectedDate.toISOString().split('T')[0],
      timezone: userTimeZone,
    }));
  }, [selectedDate, userTimeZone]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      time: selectedTime,
    }));
  }, [selectedTime]);

  async function fetchBookedTimes() {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const res = await fetch(`https://api.stitchbyte.in/api/meetings/booked?date=${dateStr}`);
    if (!res.ok) {
      setBookedTimes([]);
      return;
    }
    const data = await res.json();
    setBookedTimes(data.blockedTimes || []);
  }

  useEffect(() => {
    fetchBookedTimes();
  }, [selectedDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleAttendeeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAttendeeInput(value);

    if (value.includes('@')) {
      const [_, domainPart] = value.split('@');
      setShowDomainDropdown(true);
      setFilteredDomains(
        COMMON_DOMAINS.filter(d => d.startsWith(domainPart || ''))
      );
    } else {
      setShowDomainDropdown(false);
    }
  };

  const handleAttendeeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' ||
      e.key === ',' ||
      e.key === 'Tab'
    ) {
      e.preventDefault();
      addAttendeeEmail(attendeeInput.trim());
    }
  };

  const addAttendeeEmail = (email: string) => {
    if (
      email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      !formData.attendeeEmails.includes(email)
    ) {
      setFormData(prev => ({
        ...prev,
        attendeeEmails: [...prev.attendeeEmails, email],
      }));
    }
    setAttendeeInput('');
    setShowDomainDropdown(false);
  };

  const removeAttendeeEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      attendeeEmails: prev.attendeeEmails.filter(e => e !== email),
    }));
  };

  const handleDomainSelect = (domain: string) => {
    const [local] = attendeeInput.split('@');
    addAttendeeEmail(`${local}@${domain}`);
  };

  const timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true },
    { time: '6:00 PM', available: true },
    { time: '7:00 PM', available: true },
    { time: '8:00 PM', available: true },
    { time: '9:00 PM', available: true },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: { [key: string]: string } = {};

    if (!isValidName(formData.name)) newErrors.name = 'Please enter a valid name.';
    if (!isValidPhone(formData.phone)) newErrors.phone = 'Please enter a valid phone number.';
    if (!isValidEmail(formData.email)) newErrors.email = isTempEmail(formData.email) ? 'Do not use temporary email.' : 'Please enter a valid email.';
    if (formData.attendeeEmails.some(email => !isValidEmail(email)))
      newErrors.attendeeEmails = 'All attendee emails must be valid and not temporary.';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    // Always use the latest selectedDate, selectedTime, and userTimeZone
    const payload = {
      ...formData,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      timezone: userTimeZone,
    };

    const res = await fetch('https://api.stitchbyte.in/api/meetings/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();
    setIsSubmitting(false);

    if (result.success) {
      setMeetingLink(result.meetLink || null);
      setIsSubmitted(true);
      await fetchBookedTimes();
      setTimeout(() => {
        setIsSubmitted(false);
        setMeetingLink(null);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          attendeeEmails: [] as string[],
          date: '',
          time: '',
          timezone: userTimeZone,
        });
      }, 3000);
    } else {
      alert('Failed: ' + (result.error || 'Unknown error'));
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Let's Start Your Project
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your startup idea into a digital reality? 
            Get in touch with us today for a free consultation and to schedule a call.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-black mb-2">Contact & Schedule a Call</h3>
            <p className="text-gray-600">Fill out the form and book a free 30-minute consultation with our team.</p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl text-emerald-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Meeting Booked!</h3>
              <p className="text-gray-600">
                Thank you for reaching out. We'll get back to you within 24 hours.
              </p>
              {meetingLink && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                  <span className="block font-semibold text-emerald-700 mb-2">Your Google Meet Link:</span>
                  <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline break-all">
                    {meetingLink}
                  </a>
                </div>
              )}
              <div className="mt-4 text-emerald-700 font-medium">
                {/* Convert and display in IST */}
                {(() => {
                  const istDate = new Date(selectedDate).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    timeZone: 'Asia/Kolkata'
                  });
                  const istTime = new Date(
                    `${selectedDate.toISOString().split('T')[0]}T${convertTo24Hour(selectedTime)}:00Z`
                  ).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                    timeZone: 'Asia/Kolkata'
                  });
                  return (
                    <span>
                      Your meeting is scheduled for <b>{istDate}</b> at <b>{istTime} IST</b>
                    </span>
                  );
                })()}
              </div>
            </div>
          ) : (
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.name ? 'focus:ring-red-500' : 'focus:ring-emerald-500'} focus:border-transparent text-sm`}
                  placeholder="Enter your full name"
                />
                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.email ? 'focus:ring-red-500' : 'focus:ring-emerald-500'} focus:border-transparent text-sm`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${errors.phone ? 'focus:ring-red-500' : 'focus:ring-emerald-500'} focus:border-transparent text-sm`}
                    placeholder="+91 9876543210"
                  />
                  {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attendee Emails (for Google Meet invite) *
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.attendeeEmails.map(email => (
                    <span
                      key={email}
                      className="flex items-center border border-emerald-400 rounded-full px-3 py-1 bg-emerald-50 text-emerald-700 text-sm"
                    >
                      {email}
                      <button
                        type="button"
                        className="ml-2 text-emerald-700 hover:text-red-500"
                        onClick={() => removeAttendeeEmail(email)}
                        aria-label="Remove attendee"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  <input
                    ref={attendeeInputRef}
                    type="email"
                    value={attendeeInput}
                    onChange={handleAttendeeInputChange}
                    onKeyDown={handleAttendeeInputKeyDown}
                    className="flex-1 min-w-[180px] border-none focus:ring-0 outline-none py-1 px-2 text-sm"
                    placeholder="Add attendee and press Enter"
                    onBlur={() => setTimeout(() => setShowDomainDropdown(false), 100)}
                  />
                </div>
                {showDomainDropdown && filteredDomains.length > 0 && (
                  <div className="absolute z-10 bg-white border border-gray-200 rounded shadow mt-1">
                    {filteredDomains.map(domain => (
                      <div
                        key={domain}
                        className="px-4 py-2 cursor-pointer hover:bg-emerald-100"
                        onMouseDown={() => handleDomainSelect(domain)}
                      >
                        {attendeeInput.split('@')[0]}@{domain}
                      </div>
                    ))}
                  </div>
                )}
                {errors.attendeeEmails && <div className="text-red-500 text-xs mt-1">{errors.attendeeEmails}</div>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm resize-none"
                  placeholder="Tell us about your project requirements, timeline, and any specific features you need..."
                />
              </div>

              {/* Meeting Scheduler Controls */}
              <div>
                <h4 className="font-semibold text-black mb-3 mt-8">
                  Select Date <span className="text-gray-500 text-sm">({selectedDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })})</span>
                </h4>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-7 sm:grid-cols-7 gap-2 min-w-[420px] sm:min-w-0">
                    {/* Weekday labels */}
                    {next7Days.map((date, i) => (
                      <div key={i} className="text-center text-sm text-gray-600 py-2 font-semibold">
                        {date.toLocaleDateString(undefined, { weekday: 'short' })}
                      </div>
                    ))}
                    {/* Date buttons */}
                    {next7Days.map((date, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        style={
                          selectedDate.toDateString() === date.toDateString()
                            ? { backgroundColor: '#2A8B8A', color: '#fff' }
                            : {}
                        }
                        className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          selectedDate.toDateString() === date.toDateString()
                            ? ''
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-black mb-3">
                  Available Time Slots <span className="text-gray-500 text-sm">(IST, 9:00 AM - 9:00 PM)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {timeSlots.map((slot, index) => {
                    const isBooked = bookedTimes.includes(slot.time);
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => !isBooked && slot.available && handleTimeSelect(slot.time)}
                        disabled={!slot.available || isBooked}
                        style={
                          selectedTime === slot.time
                            ? { backgroundColor: '#2A8B8A', color: '#fff' }
                            : {}
                        }
                        className={`p-3 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          !slot.available || isBooked
                            ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                            : selectedTime === slot.time
                              ? ''
                              : 'bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700'
                        }`}
                      >
                        {convertISTtoLocal(slot.time, selectedDate, userTimeZone)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className="bg-emerald-50 border rounded-lg p-4"
                style={{ backgroundColor: '#e6f6f6', borderColor: '#2A8B8A' }}
              >
                <div className="flex items-center mb-2">
                  <i className="ri-calendar-check-line mr-2" style={{ color: '#2A8B8A' }}></i>
                  <span className="font-medium" style={{ color: '#2A8B8A' }}>
                    Selected: {selectedDate.toLocaleString('default', { month: 'long' })} {selectedDate.getDate()}, {selectedDate.getFullYear()} at {convertISTtoLocal(selectedTime, selectedDate, userTimeZone)}
                    <span className="text-gray-500 text-sm ml-2">
                      (Indian working hours: 9:00 AM – 9:00 PM IST)
                    </span>
                  </span>
                </div>
                <p className="text-sm" style={{ color: '#2A8B8A' }}>
                  Duration: 30 minutes | Platform: Google Meet
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: '#2A8B8A' }}
                className="w-full text-white py-4 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-line animate-spin mr-2"></i>
                    Booking...
                  </span>
                ) : (
                  'Book Meeting'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}