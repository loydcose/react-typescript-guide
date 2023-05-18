import { useEffect, useReducer, useRef, useState } from "react"
import { Person as SinglePersonProps, PersonProps } from "../types/Person.type"

export default function Home() {
  const person = {
    name: "loyd",
    age: 20,
  }

  const personList = [
    {
      name: "loyd",
      age: 20,
    },
    {
      name: "ben",
      age: 27,
    },
    {
      name: "karen",
      age: 31,
    },
  ]

  return (
    <div>
      <Greet name="loyd" messageCount={2} isLoggedIn={true} />
      <Person person={person} />
      <PersonList personList={personList} />
      <Status status="loading" />
      <Navbar>Navbar</Navbar>
      <Oscar>
        <p>Navbar with children as node</p>
      </Oscar>
      <Greet name="karen" isLoggedIn={true} />
      <Button handleClick={() => console.log("yey!")} />
      <Input value="" handleInput={(e) => console.log(e.target.value)} />
      <Container styles={{ border: "1px solid #fff", padding: "10px" }} />
      <Counter />
      <Timer />
      <Screen isLoggedIn={true} component={Component} />
    </div>
  )
}

// ========================================================

// messageCount? is optional
type GreetProps = {
  name: string
  messageCount?: number
  isLoggedIn: boolean
}

export function Greet(props: GreetProps) {
  return (
    <>
      <h1>Hello {props.name}!</h1>
      {props.isLoggedIn && (
        <p>you have {props.messageCount} unread messages!</p>
      )}
    </>
  )
}

// ========================================================

// you can also export types as modules
// type PersonProps = {
//   person: {
//     name: string
//     age: number
//   }
// }

export function Person(props: PersonProps) {
  return (
    <div>
      <p>{props.person.name}</p>
      <p>{props.person.age}</p>
    </div>
  )
}

// ========================================================

type PersonListProps = {
  personList: SinglePersonProps[]
}

export function PersonList(props: PersonListProps) {
  return (
    <div>
      {props.personList.map((person, index) => {
        return (
          <div key={index}>
            <p>{person.name}</p>
            <p>{person.age}</p>
          </div>
        )
      })}
    </div>
  )
}

// ========================================================

type StatusProps = {
  status: "loading" | "success" | "error"
}

export function Status(props: StatusProps) {
  let message
  if (props.status === "loading") {
    message = "loading"
  } else if (props.status === "success") {
    message = "success"
  } else {
    message = "error"
  }

  return <p>State: {message}</p>
}

// ========================================================

type NavbarProps = {
  children: string
}

export function Navbar(props: NavbarProps) {
  return <nav>{props.children}</nav>
}

// ========================================================

type OscarProps = {
  children: React.ReactNode
}

export function Oscar(props: OscarProps) {
  return <nav>{props.children}</nav>
}

// ========================================================

type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void
}

export function Button(props: ButtonProps) {
  return <button onClick={(e) => props.handleClick(e, 1)}>Click me</button>
}

// ========================================================

type InputProps = {
  value: string
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// you can destructure the props =>> Input({value, handleInput}: props)

export function Input(props: InputProps) {
  return <input type="text" onChange={(e) => props.handleInput(e)} />
}

// ========================================================

type ContainerProps = {
  styles: React.CSSProperties
}

export function Container(props: ContainerProps) {
  return (
    <div style={props.styles}>
      <p>Container with styles</p>
    </div>
  )
}

// ========================================================

export function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div>
      <button onClick={() => handleLogin()}>Login</button>
      <button onClick={() => handleLogout()}>Logout</button>
      <p>User is {isLoggedIn ? "logged in" : "logged out"}</p>
    </div>
  )
}

// ========================================================

// you can do it like this
// type UserType = null | {
//   name: string
//   age: number
// }

// or
type UserType = {
  name: string
  age: number
}

export function User() {
  const [user, setUser] = useState<UserType | null>(null)

  const handleLogin = () => {
    setUser({
      name: "loyd",
      age: 20,
    })
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div>
      <button onClick={() => handleLogin()}>Login</button>
      <button onClick={() => handleLogout()}>Logout</button>
      <p>
        User details are {user?.name} {user?.age}
      </p>
    </div>
  )
}

// ========================================================

type ClientType = {
  name: string
  age: number
}

export function Client() {
  const [client, setClient] = useState({} as ClientType)

  const handleLogin = () => {
    setClient({
      name: "loyd",
      age: 20,
    })
  }

  return (
    <div>
      <button onClick={() => handleLogin()}>Login</button>
      <p>
        User details are {client.name} {client.age}
      </p>
    </div>
  )
}

// ========================================================

type StateType = {
  count: number
}

type ActionType = {
  payload?: number
  type: "increment" | "decrement" | "reset"
}

const initialState = {
  count: 0,
}

const counterReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + (action.payload || 0) }
    case "decrement":
      return { count: state.count - (action.payload || 0) }
    case "reset":
      return initialState
    default:
      return state
  }
}

export function Counter() {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  return (
    <div style={{ padding: "10px", border: "1px solid #fff" }}>
      <p>count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment", payload: 10 })}>
        increment
      </button>
      <button onClick={() => dispatch({ type: "decrement", payload: 10 })}>
        decrement
      </button>
      <button onClick={() => dispatch({ type: "reset" })}>reset</button>
    </div>
  )
}

// ========================================================

export function DomRef() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return <input type="text" ref={inputRef} />
}

// ========================================================

export function Timer() {
  const [timer, setTimer] = useState(0)
  const timerRef = useRef<number | null>(null)

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)

    return () => stopTimer()
  }, [])

  return (
    <div>
      <p>{timer}</p>
      <button onClick={() => stopTimer()}>stop</button>
    </div>
  )
}

// ========================================================

type ComponentType = {
  name: string
}

type ScreenPropTypes = {
  isLoggedIn: boolean
  component: React.ComponentType<ComponentType>
}

export function Component({ name }: ComponentType) {
  return <p>Congrats you're logged in {name}</p>
}

export function Screen({ isLoggedIn, component: Component }: ScreenPropTypes) {
  return (
    <div>{isLoggedIn ? <Component name="loyd!" /> : <p>please login</p>}</div>
  )
}
