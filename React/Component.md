### How to maximaize reusability for react components 

https://jsmanifest.com/how-to-maximize-reusability-for-your-react-components/

Let's build a list component and try to expand its capabilities from there.

Pretend that we're building a page where users are redirected to after they registered to become part of a community of medical professionals. The page should show lists of groups that doctors can create where newly registered doctors can view. Each list should show some type of title, description, the creator of the group, an image that represents their group, and some basic essential information like dates.


```js
function List(props) {
  return (
    <div>
      <h5>
        Group: <em>Pediatricians</em>
      </h5>
      <ul>
        <p>Members</p>
        <li>Michael Lopez</li>
        <li>Sally Tran</li>
        <li>Brian Lu</li>
        <li>Troy Sakulbulwanthana</li>
        <li>Lisa Wellington</li>
      </ul>
    </div>
  )
}
//app.js
import React from 'react'
import List from './List'

function App() {
  return <List />
}

export default App

```

list 가 단순히 props를 받아서 처리한다면 
```js
function List(props) {
  return <div>{props.children}</div>
}
//app.js
function App() {
  return (
    <List>
      <h5>
        Group: <em>Pediatricians</em>
      </h5>
      <ul>
        <p>Members</p>
        <li>Michael Lopez</li>
        <li>Sally Tran</li>
        <li>Brian Lu</li>
        <li>Troy Sakulbulwanthana</li>
        <li>Lisa Wellington</li>
      </ul>
    </List>
  )
}
```

?? nothing changes in first step...



**1. Refactoring list**
```js
// make list by props...
function List({ groupName, members = [] }) {
  return (
    <div>
      <h5>
        Group: <em>{groupName}</em>
      </h5>
      <ul>
        <p>Members</p>
        {members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </div>
  )
}

//app.js
import React from 'react'
import './styles.css'

function App() {
  const pediatricians = [
    'Michael Lopez',
    'Sally Tran',
    'Brian Lu',
    'Troy Sakulbulwanthana',
    'Lisa Wellington',
  ]

  const psychiatrists = [
    'Miguel Rodriduez',
    'Cassady Campbell',
    'Mike Torrence',
  ]

  return (
    <div className="root">
      <div className="listContainer">
        <List groupName="Pediatricians" members={pediatricians} />
      </div>
      <div className="listContainer">
        <List groupName="Psychiatrists" members={psychiatrists} />
      </div>
    </div>
  )
}

export default App
```
```css
/* style.css */
.root {
  display: flex;
}

.listContainer {
  flex-grow: 1;
}
```

this looks fine.. but more functionality needed
=> to make list expand .. 

```js
function List({ groupName, members = [] }) {
  const [collapsed, setCollapsed] = React.useState(members.length > 3)
  // member length 가 3 이상이면 collapsed 상태 유지... 

  const constrainedMembers = collapsed ? members.slice(0, 3) : members

  function toggle() {
    setCollapsed((prevValue) => !prevValue)
  }

  return (
    <div>
      <h5>
        Group: <em>{groupName}</em>
      </h5>
      <ul>
        <p>Members</p>
        {constrainedMembers.map((member) => (
          <li key={member}>{member}</li>
        ))}
        {members.length > 3 && (
          <li className="expand">
        // expand를 누르면 toggle이 되면서 rerender -> memeber all render
            <button type="button" onClick={toggle}>
              Expand
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
```

**2. Label/ sub-label(fixed text) can be delegated to props**
```js
function List({ label, labelValue, sublabel, members = [] }) {
  const [collapsed, setCollapsed] = React.useState(members.length > 3)

  const constrainedMembers = collapsed ? members.slice(0, 3) : members

  function toggle() {
    setCollapsed((prevValue) => !prevValue)
  }

  return (
    <div>
      <h5>
        {label}: <em>{labelValue}</em>
      </h5>
      <ul>
        <p>{sublabel}</p>
        {constrainedMembers.map((member) => (
          <li key={member}>{member}</li>
        ))}
        {members.length > 3 && (
          <li className="expand">
            <button type="button" onClick={toggle}>
              Expand
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
```

**3. Component itself can be composed of subcomponent**


```js

//divided into subcomponent 
function ListRoot({ children, ...rest }) {
  return <div {...rest}>{children}</div>
}

function ListHeader({ children }) {
  return <h5>{children}</h5>
}

function ListComponent({ label, items = [], collapsed, toggle, limit, total }) {
  return (
    <ul>
      <p>{label}</p>
      {items.map((member) => (
        <li key={member}>{member}</li>
      ))}
      {total > limit && (
        <li className="expand">
          <button type="button" onClick={toggle}>
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </li>
      )}
    </ul>
  )
}

//and upstream props to give control of toggle/expand 
function List({ collapsed, toggle, header, label, items = [], limit = 3 }) {
  return (
    <ListRoot>
      <ListHeader>{header}</ListHeader>
      <ListComponent
        label={label}
        items={
          collapsed && items.length > limit ? items.slice(0, limit) : items
        }
        collapsed={collapsed}
        toggle={toggle}
        limit={limit}
        total={items.length}
      />
    </ListRoot>
  )
}
```

subcomponent benefit

1. We can now test each component separately
2. It becomes more scalable (Maintenance, code size)
3. It becomes more readable even when code becomes larger
4. Optimize each component with memoization using techniques like React.memo





**4. Allow override from props**


```js
function List({
  collapsed,
  toggle,
  header,
  label,
  items = [],
  limit = 3,
  renderHeader, //override props
  renderList,
}) {
  return (
    <ListRoot>
      {renderHeader ? (
        renderHeader()
      ) : // HERE
      header !== null ? ( // header가 null일 경우 처리를 해줘서 rendering 안되게 함
        <ListHeader>{header}</ListHeader>
      ) : null}

      {renderList ? (
        renderList()
      ) : (
        <ListComponent
          label={label}
          items={
            collapsed && items.length > limit ? items.slice(0, limit) : items
          }
          collapsed={collapsed}
          toggle={toggle}
          limit={limit}
          total={items.length}
        />
      )}
    </ListRoot>
  )
}
```

**Also give override to root component**

```js

function List({
  component: RootComponent = ListRoot,
  collapsed,
  toggle,
  header,
  label,
  items = [],
  limit = 3,
  renderHeader,
  renderList,
}) {
  return (
    <RootComponent>
      {renderHeader ? (
        renderHeader()
      ) : header !== null ? (
        <ListHeader>{header}</ListHeader>
      ) : null}
      {renderList ? (
        renderList()
      ) : (
        <ListComponent
          label={label}
          items={
            collapsed && items.length > limit ? items.slice(0, limit) : items
          }
          collapsed={collapsed}
          toggle={toggle}
          limit={limit}
          total={items.length}
        />
      )}
    </RootComponent>
  )
}
function App() {


    ///datas... 

  function BeautifulListContainer({ children }) {
    return (
      <div
        style={{
          background: 'teal',
          padding: 12,
          borderRadius: 4,
          color: '#fff',
        }}
      >
        {children}
        Today is: {new Date().toDateString()}
      </div>
    )
  }

  return (
    <div className="root">
      <div className="listContainer">
        <List
          component={BeautifulListContainer}
          collapsed={collapsed}
          toggle={toggle}
          header={null}
          label="Bidders"
          items={pediatricians}
          limit={limit}
        />
      </div>
      <div className="listContainer">
        <List header="Bids on" label="Bidders" items={psychiatrists} />
      </div>
    </div>
  )
}

```