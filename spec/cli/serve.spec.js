/*
 * Module dependencies.
 */

var phonegap = require('../../lib/main'),
    CLI = require('../../lib/cli'),
    cli,
    stdout;

/*
 * Specification: $ phonegap help serve
 */

describe('phonegap help serve', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(phonegap, 'serve');
        spyOn(process.stdout, 'write');
        stdout = process.stdout.write;
    });

    describe('$ phonegap help', function() {
        it('should not include the command', function() {
            cli.argv({ _: ['help'] });
            expect(stdout.mostRecentCall.args[0]).not.toMatch(/\r?\n\s+serve.*\r?\n/i);
        });
    });

    describe('$ phonegap help serve', function() {
        it('should output usage info', function() {
            cli.argv({ _: ['help', 'serve'] });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ app/i);
        });
    });

    describe('$ phonegap serve help', function() {
        it('should output usage info', function() {
            cli.argv({ _: ['serve', 'help'] });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ app/i);
        });
    });

    describe('$ phonegap serve --help', function() {
        it('should output usage info', function() {
            cli.argv({ _: ['serve'], help: true });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ app/i);
        });
    });

    describe('$ phonegap serve -h', function() {
        it('should output usage info', function() {
            cli.argv({ _: ['serve'], h: true });
            expect(stdout.mostRecentCall.args[0]).toMatch(/usage: [\S]+ app/i);
        });
    });
});

/*
 * Specification: $ phonegap serve
 */

describe('phonegap serve', function() {
    beforeEach(function() {
        cli = new CLI();
        spyOn(process.stdout, 'write');
        spyOn(phonegap, 'app').andReturn({
            on: function(){}
        });
    });

    describe('$ phonegap serve', function() {
        it('should connect to phonegap serve', function() {
            cli.argv({ _: ['serve'] });
            expect(phonegap.app).toHaveBeenCalled();
        });
    });

    describe('$ phonegap serve --port 1337', function() {
        it('should connect to phonegap serve on port 1337', function() {
            cli.argv({ _: ['serve'], port: 1337 });
            expect(phonegap.app).toHaveBeenCalled();
            expect(phonegap.app.mostRecentCall.args[0]).toEqual({ port: 1337 });
        });
    });

    describe('$ phonegap serve -p 1337', function() {
        it('should connect to phonegap serve on port 1337', function() {
            cli.argv({ _: ['serve'], p: 1337 });
            expect(phonegap.app).toHaveBeenCalled();
            expect(phonegap.app.mostRecentCall.args[0]).toEqual({ port: 1337 });
        });
    });
});
