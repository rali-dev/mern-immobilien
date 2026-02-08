import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regular_price: {
      type: Number,
      required: true,
    },
    discount_price: {
      type: Number,
      required: false,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    forSale: {
      type: Boolean,
      required: true,
    },
    image_url: {
      type: [String],
      required: true,
    },
    owner_id: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;