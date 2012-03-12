var mongoose = require('mongoose'), Employee = require('../app/model/employee'), Group = require('../app/model/group'), User = require('../app/model/user'), should = require('should');

var factory = require('../app/lib/display-factory');
var df = factory.DisplayFactory;

describe('Factory', function () {
    describe('createSchema', function () {

        it('should be awesome at creating fields', function (done) {
            var Schema = df.createSchema(User);
            console.log('Schema', Schema);
            Schema.should.have.property('paths');
            var stuff = Schema.paths;
            console.log(df.UIModel);
            stuff.should.have.property('username');
            stuff.username.should.have.property('validator').eql(['required'])
            stuff.should.have.property('twitter');
            stuff.twitter.should.have.property('validator').with.lengthOf(2);
            stuff.should.have.property('created_by');
            stuff.created_by.should.have.property('title', 'Created By');
            stuff.should.have.property('password');
            stuff.password.should.have.property('dataType', 'String');
            stuff.should.not.have.property('_password');
            stuff.should.not.have.property('created_at');
            Schema.should.have.property('display');
            done()
        });

    });
    describe('createFields', function () {
        it('should return the fields options', function (done) {
            df.createFields(User).should.eql(['username', 'first_name', 'last_name', 'twitter', 'email', 'groups']);
            done();
        });
        it('should return all fields', function(done){
            //TODO - order may be random, fix to ensure values and not order.
            df.createFields(Group).should.eql(['name', 'description', 'created_at', 'modified_at', '_id', 'id']);
            done();

        });
    })
    describe('createEditors', function () {
        it('should return a list of editors', function (done) {
            df.createEditors(User).should.eql(['jquery-editors', 'libs/editors/multi-editor']);
            done();
        });
    });
});