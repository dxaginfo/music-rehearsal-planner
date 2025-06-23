import mongoose from 'mongoose';

interface IRehearsal extends mongoose.Document {
  bandId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  location?: {
    name: string;
    address?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  recurringPattern?: {
    frequency: string;
    interval: number;
    endDate?: Date;
  };
  createdBy: mongoose.Types.ObjectId;
  attendees: {
    userId: mongoose.Types.ObjectId;
    status: string;
    responseTime?: Date;
    notes?: string;
  }[];
  resources: {
    type: string;
    name: string;
    url: string;
    uploadedBy: mongoose.Types.ObjectId;
    uploadedAt: Date;
  }[];
  notes: {
    content: string;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const rehearsalSchema = new mongoose.Schema<IRehearsal>(
  {
    bandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Band',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    location: {
      name: { type: String, required: true },
      address: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    startTime: {
      type: Date,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: Date,
      required: [true, 'End time is required'],
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringPattern: {
      frequency: { type: String, enum: ['daily', 'weekly', 'monthly'] },
      interval: { type: Number, default: 1 },
      endDate: { type: Date },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    attendees: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        status: {
          type: String,
          enum: ['confirmed', 'declined', 'tentative', 'pending'],
          default: 'pending',
        },
        responseTime: {
          type: Date,
        },
        notes: {
          type: String,
        },
      },
    ],
    resources: [
      {
        type: {
          type: String,
          enum: ['sheet', 'audio', 'video', 'other'],
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    notes: [
      {
        content: {
          type: String,
          required: true,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Rehearsal = mongoose.model<IRehearsal>('Rehearsal', rehearsalSchema);

export default Rehearsal;