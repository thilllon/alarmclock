const mongoose = require('mongoose');

const AlarmSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    status: { type: Number, required: true, default: 0 },
    statusText: { type: String, required: true, default: '' },
  },
  {
    timestamps: true,
  }
);

const AlarmModel = mongoose.model('Alarm', AlarmSchema);

exports.AlarmModel = AlarmModel;
