var seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose 
seeder.connect('mongodb://localhost:27017/bikes', function() {
  // Load Mongoose models 
  seeder.loadModels(['./models/Part.js']);
  // Clear specified collections 
  seeder.clearModels(['Part'], function() {
    // Callback to populate DB once collections have been cleared 
    seeder.populateModels(data);
  });
});


var data = [
  {
    'model': 'Part',
    'documents': [

      {
        name: "seat",
        path: "bike1seat.svg",
        width: 120,
        height: 45,
        top: 120,
        left: 306
      },
      {
        name: "backWheel",
        path: "backBike1wheel.svg",
        width: 290,
        height: 292,
        top: 233,
        left: 119
      },
      {
        name: "frontWheel",
        path: "frontBike1wheel.svg",
        width: 290,
        height: 292,
        top: 228,
        left: 557
      },
      {
        name: "handleBar",
        path: "bike1handlebar.svg",
        width: 130,
        height: 108,
        top: 100,
        left: 598
      },
      {
        name: "gears",
        path: "bike1gears.svg",
        width: 310,
        height: 108,
        top: 355,
        left: 210
      },
      {
        name: "frame",
        path: "bike1frame.svg",
        width: 450,
        height: 280,
        top: 150,
        left: 255
      }
    ]
  }
]