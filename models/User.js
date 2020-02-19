const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(value) {
                if (!this.isModified('username')) return;
                const user = await User.findOne({username: value})
                if (user) throw new Error();
            },
            message: 'This user is alreade registered'
        }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    }
})

UserSchema.methods.generateToken = function() {
    this.token = nanoid();
};

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
} 

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();    

    const salt = await bcrypt.getSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);

    this.password = hash;

    next();
}); 

UserSchema.set('toJSON', {
    transform: (doc, ret, opttions) => {
        delete ret.password;
        return ret
    }
})

const User = mongoose.model('User', UserSchema)
 
module.exports = User;