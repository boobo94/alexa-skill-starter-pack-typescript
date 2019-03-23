"use strict";

const gulp = require("gulp");
const path = require("path");
const child_process = require("child_process");
const del = require("del");

const IN_DIR = "custom/";
const OUT_DIR = "dist/";

gulp.task("tsc", function (done) {
    const tscPath = path.normalize("./node_modules/.bin/tsc");
    const command = `${tscPath} -p tsconfig.json`;

    child_process.execSync(command, {
        stdio: "inherit"
    });
    done();
});

// gulp.task("test", gulp_base.test);

gulp.task("json", function () {
    return gulp.src(IN_DIR + '/**/package.json').pipe(gulp.dest(OUT_DIR));
});

gulp.task("models", function (done) {
    const fs = require("fs");

    /**
     * Reads the model for the given locale and returns the parsed JSON.
     *
     * @param {string} locale
     */
    function readModel(locale) {
        const model = fs.readFileSync(`${__dirname}/models/${locale}.json`, "utf-8");
        return JSON.parse(model);
    }

    /**
     * Writes the given model to the file.
     *
     * @param {object} model
     * @param {string} locale
     */
    function writeModel(model, locale) {
        const json = JSON.stringify(model, null, 2);
        fs.writeFileSync(`${__dirname}/models/${locale}.json`, json);
    }

    const Locales = {
        enUS: "en-US"
    };

    const Environments = {
        Dev: "dev",
        Prod: "prod",
    };

    const invocations = {
        [Environments.Dev]: {
            [Locales.enUS]: "probot dev",
        },
        [Environments.Prod]: {
            [Locales.enUS]: "probot",
        },
    };

    // make sure we have the environment set
    if (!process.env.ENV) {
        throw new Error("ENV environment variable not set");
    }

    // get the current environment
    const env = process.env.ENV;

    // make sure the env is valid
    if (env !== Environments.Local
        && env !== Environments.Dev
        && env !== Environments.Prod) {
        throw new Error("Invalid ENV environment variable: " + env);
    }

    // read the models
    const enUSModel = readModel(Locales.enUS);

    // set the invocation names
    enUSModel.interactionModel.languageModel.invocationName = invocations[env][Locales.enUS];

    // write the model to the file
    writeModel(enUSModel, Locales.enUS);

    done();
});

gulp.task("clean", () => {
    return del([".coverage", "dist"]);
});

gulp.task("default", gulp.series("clean", gulp.parallel("tsc", "json")));
gulp.task("release", gulp.series("default"));
