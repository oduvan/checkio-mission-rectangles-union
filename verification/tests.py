"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [[
                [6, 3, 8, 10],
                [4, 8, 11, 10],
                [16, 8, 19, 11]
            ]],
            "answer": 33,
            "explanation": "4 points intersections"
        },{
            "input": [[
                [16, 8, 19, 11]
            ]],
            "answer": 9,
            "explanation": "One rectangle, no intersections"
        },{
            "input": [[
                [16, 8, 19, 11],
                [16, 8, 19, 11]
            ]],
            "answer": 9,
            "explanation": "two same rectangles are the same"
        },{
            "input": [[
                [16, 8, 16, 8]
            ]],
            "answer": 0,
            "explanation": "rectangle of zero area"
        },{
            "input": [[
            ]],
            "answer": 0,
            "explanation": "no rectangles"
        }
    ],
    "Extra": [
        {
            "input": [[
                [6, 3, 8, 10],
                [4, 8, 11, 10],
                [16, 8, 19, 11],
                [6, 8, 8, 12]
            ]],
            "answer": 37,
            "explanation": "4 points intersections (with 3 rectangles)"
        },
        {
            "input": [[
                [6, 3, 8, 10],
                [4, 8, 11, 10],
                [16, 8, 19, 11],
                [4, 8, 6, 12]
            ]],
            "answer": 37
        }
    ]
}
