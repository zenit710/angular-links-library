import * as mongoose from "mongoose";

export const STATUS_TO_READ: string = "TO_READ";
export const STATUS_READ: string = "READ";

export type LinkModel = mongoose.Document & {
    name: string,
    url: string,
    description: string,
    status: string,
    favourite: boolean
    // + deklaracje funkcji dodawanych później w schema
};

const linkSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nazwa linku jest wymagana"],
        minlength: [3, "Nazwa musi być dłuższa niż 3 znaki"]
    },
    url: {
        type: String,
        unique: [true, "Podany adres URL już jest zapisany"],
        required: [true, "Adres URL jest wymagany"]
    },
    description: String,
    status: {
        type: String,
        default: STATUS_TO_READ
    },
    favourite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

//linkSchema.pre("save", function save(next) {} - co zrobić przed zapisem

//linkSchema.methods.jakies_funkcyje = function()

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const Link = mongoose.model("Link", linkSchema);
export default Link;