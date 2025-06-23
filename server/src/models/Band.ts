import mongoose from 'mongoose';

interface IBand extends mongoose.Document {
  name: string;
  description?: string;
  genre?: string;
  logo?: string;
  createdBy: mongoose.Types.ObjectId;
  members: {
    userId: mongoose.Types.ObjectId;
    role: string;
    joinedAt: Date;
    isAdmin: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const bandSchema = new mongoose.Schema<IBand>(
  {
    name: {
      type: String,
      required: [true, 'Band name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        role: {
          type: String,
          default: 'member',
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        isAdmin: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Band = mongoose.model<IBand>('Band', bandSchema);

export default Band;