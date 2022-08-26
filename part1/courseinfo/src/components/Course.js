import React from 'react'

const Header = ({ headerTitle }) => <h2>{headerTitle}</h2>

const Part = ({ coursePart }) => <p> {coursePart.name} {coursePart.exercises}</p>

const ExerciseSum = ({ course }) => <b> total of {course.parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises </b>

const Content = ({ course }) => {
    return (
        <>
            {course.parts.map(coursePart => <Part key={coursePart.id} coursePart={coursePart} />)}
            <ExerciseSum course={course} />
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header headerTitle={course.name} />
            <Content course={course} />
        </div>
    )
}

export default Course