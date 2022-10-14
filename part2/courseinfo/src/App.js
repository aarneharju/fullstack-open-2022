const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  console.log({ props });
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
  return <p>Number of exercises {props.parts[0]['exercises'] + props.parts[1]['exercises'] + props.parts[2]['exercises']}</p>
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />

}

export default App