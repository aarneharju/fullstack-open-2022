import React from 'react';

const Header = (props) => {
    return (
        <h2>{props.course.name}</h2>
    )
}

const Content = (props) => {
    const partsArray = props.parts.map(part => <Part key={part.id} part={part} />)
    return (
        <div>
            {partsArray}
        </div>
    )
}

const Part = (props) => {
    return (
        < p >
            {props.part['name']} {props.part['exercises']}
        </p >
    )
}

const Total = (props) => {
    const sumOfExercises = props.parts.reduce((sumOfValues, currentPart) => sumOfValues + currentPart.exercises, 0);
    return <h4>Number of exercises {sumOfExercises} </h4>
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

export { Header, Content, Part, Total, Course };