import mongoose, { Schema, Document, Types, Model} from 'mongoose';

export enum Role {
    SHIPPER = 'SHIPPER',
    CARRIER = 'CARRIER',
    ADMIN = 'ADMIN',
    BROKER = 'BROKER',
}

export interface IUser extends Document {
    role: Role;
    name: string;
    subname: string;
    email: string;
    password: string;
    companyName?: string;
    phone?: string;
    createdAt?: Date;
    loads: Types.ObjectId[];
    trucks: Types.ObjectId[];
    shipments: Types.ObjectId[];
    isActive: boolean;
    lastUpdate: Date;
}

const userSchema = new Schema<IUser>({
    role: { type: String, enum: Object.values(Role), required:true },
    name: { type: String, required: true, trim: true },
    subname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    companyName: { type: String, trim: true },
    phone: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    loads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Load' }],
    trucks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Truck' }],
    shipments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shipment' }],
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;