// User types
export interface User {
  _id: string;
  email: string;
  name: string;
  instrument?: string;
  phone?: string;
  profilePicture?: string;
  defaultAvailability?: Availability[];
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  instrument?: string;
  phone?: string;
}

// Band types
export interface Band {
  _id: string;
  name: string;
  description?: string;
  genre?: string;
  logo?: string;
  createdBy: string | User;
  members: BandMember[];
  createdAt: string;
  updatedAt: string;
}

export interface BandMember {
  userId: string | User;
  role: string;
  joinedAt: string;
  isAdmin: boolean;
}

export interface BandFormData {
  name: string;
  description?: string;
  genre?: string;
  logo?: File;
}

// Rehearsal types
export interface Rehearsal {
  _id: string;
  bandId: string | Band;
  title: string;
  description?: string;
  location?: Location;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  createdBy: string | User;
  attendees: Attendee[];
  resources: Resource[];
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  name: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface RecurringPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: string;
}

export interface Attendee {
  userId: string | User;
  status: 'confirmed' | 'declined' | 'tentative' | 'pending';
  responseTime?: string;
  notes?: string;
}

export interface Resource {
  type: 'sheet' | 'audio' | 'video' | 'other';
  name: string;
  url: string;
  uploadedBy: string | User;
  uploadedAt: string;
}

export interface Note {
  content: string;
  createdBy: string | User;
  createdAt: string;
}

export interface RehearsalFormData {
  bandId: string;
  title: string;
  description?: string;
  location?: {
    name: string;
    address?: string;
  };
  startTime: string;
  endTime: string;
  isRecurring: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  invitedMembers?: string[];
}

// Availability types
export interface Availability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface AvailabilitySlot {
  userId: string;
  bandId: string;
  date: string;
  slots: {
    startTime: string;
    endTime: string;
    available: boolean;
  }[];
  note?: string;
  updatedAt: string;
}

// Notification types
export interface Notification {
  _id: string;
  userId: string;
  type: 'rehearsal_created' | 'rehearsal_updated' | 'rehearsal_cancelled' | 'band_invitation' | 'note_added' | 'resource_added';
  title: string;
  message: string;
  relatedTo: {
    type: 'rehearsal' | 'band' | 'note' | 'resource';
    id: string;
  };
  isRead: boolean;
  createdAt: string;
}