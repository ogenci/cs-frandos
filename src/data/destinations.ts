import parisImg from '@assets/generated_images/paris.webp';
import dubaiImg from '@assets/generated_images/dubai.webp';
import londonImg from '@assets/generated_images/london.webp';
import torontoImg from '@assets/generated_images/toronto.webp';
import nycImg from '@assets/generated_images/nyc.webp';
import amsterdamImg from '@assets/generated_images/amsterdam.webp';

export interface Destination {
  slug: string;
  img: string;
  name: string;
  country: string;
  rating: number;
  reviews: number;
  price: string;
  duration: string;
  description: string;
  highlights: string[];
  itinerary: { day: string; title: string; description: string }[];
  included: string[];
}

export const destinations: Destination[] = [
  {
    slug: 'paris',
    img: parisImg,
    name: 'Paris',
    country: 'France',
    rating: 4.9,
    reviews: 1200,
    price: '₵1,299',
    duration: '6 Day 5 Night',
    description:
      'Experience the romance and charm of the City of Light. From the iconic Eiffel Tower to the world-class Louvre Museum, Paris offers an unforgettable blend of art, culture, and cuisine. Our all-inclusive package ensures you experience the best of Paris with seamless travel arrangements and premium accommodation.',
    highlights: [
      'Skip-the-line access to the Eiffel Tower',
      'Guided tour of the Louvre Museum',
      'Seine River cruise with dinner',
      'Visit to Montmartre and Sacré-Cœur',
      'Day trip to Palace of Versailles',
      'Gourmet French cooking class',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Welcome', description: 'Airport pickup, transfer to hotel, and welcome dinner at a classic Parisian bistro.' },
      { day: 'Day 2', title: 'Iconic Landmarks', description: 'Morning visit to the Eiffel Tower, afternoon at the Louvre, evening Seine cruise.' },
      { day: 'Day 3', title: 'Art & Culture', description: 'Explore Montmartre, Sacré-Cœur, and the vibrant art scene of the Left Bank.' },
      { day: 'Day 4', title: 'Versailles Day Trip', description: 'Full-day excursion to the Palace of Versailles with guided tour and garden access.' },
      { day: 'Day 5', title: 'Cooking & Shopping', description: 'French cooking class in the morning, afternoon shopping on Champs-Élysées.' },
      { day: 'Day 6', title: 'Departure', description: 'Breakfast, souvenir shopping, and airport transfer.' },
    ],
    included: [
      'Return flights (economy)',
      '5 nights 4-star hotel',
      'Daily breakfast & 3 dinners',
      'All guided tours & entry fees',
      'Airport transfers',
      'Travel insurance',
    ],
  },
  {
    slug: 'dubai',
    img: dubaiImg,
    name: 'Dubai',
    country: 'UAE',
    rating: 5.0,
    reviews: 2148,
    price: '₵999',
    duration: '4 Day 3 Night',
    description:
      'Discover the dazzling metropolis of Dubai, where futuristic architecture meets Arabian hospitality. From the towering Burj Khalifa to the golden desert dunes, this package delivers a luxury experience at an incredible value.',
    highlights: [
      'At the Top - Burj Khalifa observation deck',
      'Desert safari with dune bashing & BBQ dinner',
      'Dubai Mall & Dubai Fountain show',
      'Abra ride along Dubai Creek',
      'Visit to the historic Al Fahidi district',
      'Gold & Spice Souk walking tour',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Dubai', description: 'Airport pickup, hotel check-in, evening Dubai Marina walk and dinner.' },
      { day: 'Day 2', title: 'City Highlights', description: 'Burj Khalifa, Dubai Mall, afternoon at Dubai Creek and souks.' },
      { day: 'Day 3', title: 'Desert Adventure', description: 'Morning at leisure, afternoon desert safari with camel rides and BBQ.' },
      { day: 'Day 4', title: 'Departure', description: 'Breakfast, last-minute shopping, and airport transfer.' },
    ],
    included: [
      'Return flights (economy)',
      '3 nights 5-star hotel',
      'Daily breakfast & 2 dinners',
      'Desert safari with BBQ dinner',
      'Burj Khalifa tickets',
      'Airport transfers',
    ],
  },
  {
    slug: 'london',
    img: londonImg,
    name: 'London',
    country: 'UK',
    rating: 4.8,
    reviews: 1850,
    price: '₵1,499',
    duration: '7 Day 6 Night',
    description:
      'Explore the rich history and vibrant culture of London. From the historic Tower of London to the modern London Eye, this package covers all the must-see attractions while giving you time to discover hidden gems.',
    highlights: [
      'Westminster Abbey & Houses of Parliament tour',
      'Tower of London with Crown Jewels access',
      'London Eye experience',
      'British Museum guided tour',
      'Camden Market & street food exploration',
      'Day trip to Windsor Castle',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Orientation', description: 'Airport pickup, hotel check-in, and panoramic London bus tour.' },
      { day: 'Day 2', title: 'Royal London', description: 'Buckingham Palace, Westminster Abbey, Houses of Parliament, and London Eye.' },
      { day: 'Day 3', title: 'History & Heritage', description: 'Tower of London, Tower Bridge, and afternoon at the British Museum.' },
      { day: 'Day 4', title: 'Markets & Modern London', description: 'Camden Market, Covent Garden, and evening West End show.' },
      { day: 'Day 5', title: 'Windsor Day Trip', description: 'Full-day excursion to Windsor Castle with guided tour.' },
      { day: 'Day 6', title: 'Free Day', description: 'At leisure for shopping, museums, or exploring neighbourhoods.' },
      { day: 'Day 7', title: 'Departure', description: 'Breakfast and airport transfer.' },
    ],
    included: [
      'Return flights (economy)',
      '6 nights 4-star hotel',
      'Daily breakfast & 4 dinners',
      'All entry fees & guided tours',
      'West End theatre ticket',
      'Airport transfers',
    ],
  },
  {
    slug: 'toronto',
    img: torontoImg,
    name: 'Toronto',
    country: 'Canada',
    rating: 4.9,
    reviews: 980,
    price: '₵1,199',
    duration: '5 Day 4 Night',
    description:
      'Experience the multicultural heart of Canada. Toronto\'s skyline, islands, and diverse neighbourhoods make it one of North America\'s most exciting destinations. Our package includes visits to Niagara Falls and the iconic CN Tower.',
    highlights: [
      'CN Tower EdgeWalk or observation deck',
      'Niagara Falls day trip with boat cruise',
      'Distillery District walking tour',
      'Kensington Market & Graffiti Alley',
      'Toronto Islands ferry & picnic',
      'Royal Ontario Museum visit',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in Toronto', description: 'Airport pickup, hotel check-in, evening walk through the Distillery District.' },
      { day: 'Day 2', title: 'City Landmarks', description: 'CN Tower, Ripley\'s Aquarium, and afternoon at the Royal Ontario Museum.' },
      { day: 'Day 3', title: 'Niagara Falls', description: 'Full-day trip to Niagara Falls with Hornblower cruise and wine tasting.' },
      { day: 'Day 4', title: 'Neighbourhoods & Nature', description: 'Kensington Market, Graffiti Alley, and afternoon on Toronto Islands.' },
      { day: 'Day 5', title: 'Departure', description: 'Breakfast and airport transfer.' },
    ],
    included: [
      'Return flights (economy)',
      '4 nights 4-star hotel',
      'Daily breakfast & 2 dinners',
      'Niagara Falls tour with cruise',
      'CN Tower tickets',
      'Airport transfers',
    ],
  },
  {
    slug: 'new-york',
    img: nycImg,
    name: 'New York',
    country: 'USA',
    rating: 4.7,
    reviews: 3200,
    price: '₵1,350',
    duration: '6 Day 5 Night',
    description:
      'The city that never sleeps awaits. From the bright lights of Times Square to the serenity of Central Park, New York City is a destination like no other. Our package covers all five boroughs\' highlights with expert guides.',
    highlights: [
      'Statue of Liberty & Ellis Island tour',
      'Times Square & Broadway marquees',
      'Central Park carriage ride',
      'World Trade Center & 9/11 Memorial',
      'Brooklyn Bridge & DUMBO walk',
      'Metropolitan Museum of Art visit',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival in NYC', description: 'Airport pickup, hotel check-in, evening Times Square experience.' },
      { day: 'Day 2', title: 'Liberty & Landmarks', description: 'Statue of Liberty, Ellis Island, and afternoon on Wall Street.' },
      { day: 'Day 3', title: 'Manhattan Icons', description: 'Central Park, Museum of Modern Art, and Rockefeller Center.' },
      { day: 'Day 4', title: 'Brooklyn & Culture', description: 'Brooklyn Bridge walk, DUMBO, and afternoon at the Met.' },
      { day: 'Day 5', title: 'Markets & Shopping', description: 'Chelsea Market, SoHo shopping, and evening Broadway show.' },
      { day: 'Day 6', title: 'Departure', description: 'Breakfast and airport transfer.' },
    ],
    included: [
      'Return flights (economy)',
      '5 nights 4-star hotel',
      'Daily breakfast & 3 dinners',
      'Statue of Liberty cruise',
      'Broadway show ticket',
      'Airport transfers',
    ],
  },
  {
    slug: 'amsterdam',
    img: amsterdamImg,
    name: 'Amsterdam',
    country: 'Netherlands',
    rating: 4.8,
    reviews: 740,
    price: '₵1,099',
    duration: '5 Day 4 Night',
    description:
      'Discover the enchanting canals, world-class museums, and vibrant culture of Amsterdam. This package combines the best of Dutch art, history, and modern city life with comfortable accommodations and expert guides.',
    highlights: [
      'Anne Frank House guided tour',
      'Rijksmuseum & Van Gogh Museum',
      'Canal cruise with dinner',
      'Amsterdam countryside & windmills tour',
      'Food tasting tour (Dutch specialties)',
      'Visit to the Jordaan district',
    ],
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Canals', description: 'Airport pickup, hotel check-in, and evening canal cruise.' },
      { day: 'Day 2', title: 'Museums & Art', description: 'Rijksmuseum, Van Gogh Museum, and afternoon in Museumplein.' },
      { day: 'Day 3', title: 'History & Culture', description: 'Anne Frank House, Jordaan district, and food tasting tour.' },
      { day: 'Day 4', title: 'Countryside Day', description: 'Day trip to Zaanse Schans windmills and Volendam fishing village.' },
      { day: 'Day 5', title: 'Departure', description: 'Breakfast, souvenir shopping, and airport transfer.' },
    ],
    included: [
      'Return flights (economy)',
      '4 nights 4-star hotel',
      'Daily breakfast & 2 dinners',
      'Museum entry fees',
      'Canal cruise with dinner',
      'Airport transfers',
    ],
  },
];
