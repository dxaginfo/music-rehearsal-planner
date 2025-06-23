import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends mongoose.Document {
  email: string;
  password: string;
  name: string;
  phone?: string;
  instrument?: string;
  profilePicture?: string;
  defaultAvailability: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
  }[];
  notifications: {
    email: boolean;
    push: boolean;
    reminderHours: number;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    instrument: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    defaultAvailability: [
      {
        dayOfWeek: { type: Number, min: 0, max: 6 }, // 0 = Sunday, 6 = Saturday
        startTime: { type: String },
        endTime: { type: String },
      },
    ],
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      reminderHours: { type: Number, default: 24 },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;