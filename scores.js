"use strict";

const scores = [];
const scoreStrings = [];

// Function to display scores and calculate the average
const displayScores = () => {
    let totalScore = 0;
    scores.forEach(score => totalScore += score);
    const averageScore = (scores.length > 0) ? (totalScore / scores.length).toFixed(2) : 0;

    // Display the average score in the "avr_score" label
    $("#avr_score").text(averageScore);

    // Display all student names and scores in the "scores" textarea
    $("#scores").val(scoreStrings.join("\n"));
};

$(document).ready(() => {
    // Event handler for adding a student score
    $("#add_button").click(() => {
        const firstName = $("#first_name").val().trim();
        const lastName = $("#last_name").val().trim();
        const score = parseFloat($("#score").val());

        // Validate input
        if (firstName === "" || lastName === "" || isNaN(score) || score < 0 || score > 100) {
            alert("Please enter valid data: non-empty names and a score between 0 and 100.");
            $("#first_name").focus();
            return;
        }

        // Add score to the scores array
        scores.push(score);

        // Add student name and score string to the scoreStrings array
        const studentString = `${lastName}, ${firstName}: ${score}`;
        scoreStrings.push(studentString);

        displayScores();

        // Clear the form and set focus on the first field
        $("#first_name").val("");
        $("#last_name").val("");
        $("#score").val("");
        $("#first_name").focus();
    });

    // Event handler for clearing all student scores
    $("#clear_button").click(() => {
        scores.length = 0;
        scoreStrings.length = 0;

        $("#avr_score").text("");
        $("#scores").val("");

        $("#first_name").focus();
    });

    // Event handler for sorting by last name
    $("#sort_button").click(() => {
        scoreStrings.sort((a, b) => {
            const lastNameA = a.split(",")[0].toLowerCase();
            const lastNameB = b.split(",")[0].toLowerCase();
            return lastNameA.localeCompare(lastNameB);
        });

        displayScores();
    });

    $("#first_name").focus();
});
