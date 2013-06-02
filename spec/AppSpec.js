describe("Age Calculator Test Suite", function() {
  it("can run tests", function() {
    expect(true).toBe(true);
  });

  it('App object exists', function () {
    expect(App).toBeDefined();
  });

  it('Visitor is defined as a model', function () {
    expect(Visitor).toBeDefined();
  });
})


describe("Visitor", function() {
  
  beforeEach(function() {
    visitor = Visitor.create();
    date = visitor.todaysDate;
  });

  describe("initialization", function() {

    it("starts with an undefined dateOfBirth attr", function (done) {
      expect(visitor.dateOfBirth).toBeUndefined();
    });

    it('starts with a default attr of todaysDate which is set to today', function (done) {
      expect(visitor.todaysDate).toBeDefined();
      expect(visitor.todaysDate).toEqual(date);
    });

    it('starts with an undefined oldToday attribute', function (done) {
      expect(visitor.oldToday).toBeUndefined();
    });

    it('starts with an undefined referenceDate attribute', function (done) {
      expect(visitor.referenceDate).toBeUndefined();
    });

    it('starts with an undefined referenceAge attribute', function (done) {
      expect(visitor.referenceAge).toBeUndefined();
    });

  });

  describe("observer for dateOfBirth", function() {
    beforeEach(function() {
      dec1385 = new Date('12/13/1985');
      dec1389 = new Date('12/13/1989');
      spyOn(visitor, "calculateOldToday").andCallThrough();
      visitor.set('todaysDate',  moment(dec1389) );
      visitor.set('dateOfBirth', moment(dec1385) );
    });

    describe("when dateOfBirth is set", function() {

      it('should update the oldToday attribute', function (done) {
        expect(visitor.oldToday).toEqual(4)
      });

      it('should call the calculateOldToday function', function (done) {
        expect(visitor.calculateOldToday).toHaveBeenCalled();
      });

    });

    describe("#calculateOldToday", function () {

      it('should be defined', function (done) {
        expect(visitor.calculateOldToday()).toBeDefined();
      });

      it('should calculate number of years between dateOfBirth & todaysDate', function (done) {
        expect(visitor.oldToday).toEqual(4);
      });

    });

  }); // end observer for dateOfBirth


  describe("observer for referenceAge", function() {
    
    beforeEach(function() {
      dec1385 = new Date('12/13/1985');
      dec1395 = new Date('12/13/1995');

      spyOn(visitor, "calculateReferenceDate").andCallThrough();
      spyOn(visitor, "calculateOldToday").andCallThrough();

      visitor.set('dateOfBirth', moment(dec1385) );
      visitor.set('todaysDate',  moment(dec1395) );
      visitor.set('referenceAge', 5);
      fiveYears = visitor.dateOfBirth.add("years", 5);
    });

    describe("when referenceAge is set", function() {

      it('should update the referenceDate attribute', function (done) {
        expect(visitor.referenceDate).toEqual(fiveYears);
      });

      it('should call the calculateReferenceDate function', function (done) {
        expect(visitor.calculateReferenceDate).toHaveBeenCalled();
      });

    });

  }); // end observer for referenceAge

  describe("observer for referenceDate", function() {
    
    beforeEach(function() {
      dec1385 = new Date('12/13/1985');
      dec1395 = new Date('12/13/1995');
      dec1390 = new Date('12/13/1990');

      spyOn(visitor, "calculateReferenceAge").andCallThrough();
      spyOn(visitor, "calculateOldToday").andCallThrough();

      visitor.set('dateOfBirth', moment(dec1385) );
      visitor.set('todaysDate',  moment(dec1395) );
      visitor.set('referenceDate', moment(dec1390));
    });

    describe("when referenceDate is set", function() {

      it('should update the referenceAge attribute', function (done) {
        expect(visitor.referenceAge).toEqual(5);
      });

      it('should call the calculateReferenceAge function', function (done) {
        expect(visitor.calculateReferenceAge).toHaveBeenCalled();
      });

    });

  }); // end observer for referenceDate

})


