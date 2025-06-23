import mongoose from 'mongoose';

interface IAvailability extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  bandId: mongoose.Types.ObjectId;
  date: Date;
  slots: {
    startTime: string;
    endTime: string;
    available: boolean;
  }[];
  note?: string;
  updatedAt: Date;
}

const availabilitySchema = new mongoose.Schema<IAvailability>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Band',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slots: [
      {
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
        available: {
          type: Boolean,
          default: false,
        },
      },
    ],
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create a compound index to ensure uniqueness
availabilitySchema.index({ userId: 1, bandId: 1, date: 1 }, { unique: true });

const Availability = mongoose.model<IAvailability>('Availability', availabilitySchema);

export default Availability;