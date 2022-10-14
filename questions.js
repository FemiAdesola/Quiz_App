let questions = [
    {
        question: 'How can you attempt to access the property `a.b` on `obj` without throwing an error if a is undefined? let obj = {};',
        choice1: 'obj?.a.b',
        choice2: 'obj.a?.b',
        choice3: 'obj[a][b]',
        choice4: 'obj.?a.?b',
        answer: 2,
    },
    {
        question:
            `What happens when you run this code?
            if (true) { var x = 5;
            const y = 6;
            let z = 7; }
            console.log(x + y + z);`
        ,
        choice1: "It will throw a ReferenceError about x",
        choice2: "It will print 18",
        choice3: "It will print undefined",
        choice4: "It will throw a ReferenceError about y",
        answer: 4,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];