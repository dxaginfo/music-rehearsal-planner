import mongoose from 'mongoose';

interface INotification extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: string;
  title: string;
  message: string;
  relatedTo: {
    type: string;
    id: mongoose.Types.ObjectId;
  };
  isRead: boolean;
  createdAt: Date;
}

const notificationSchema = new mongoose.Schema<INotification>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'rehearsal_created',
        'rehearsal_updated',
        'rehearsal_cancelled',
        'band_invitation',
        'note_added',
        'resource_added',
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    relatedTo: {
      type: {
        type: String,
        enum: ['rehearsal', 'band', 'note', 'resource'],
        required: true,
      },
      id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;