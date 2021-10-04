import { useState, useRef } from 'react';
import { TrashIcon,  CheckCircleIcon} from '@heroicons/react/solid'

function App() {
  const [list, setList] = useState([]);
  const newItem = useRef('');
  const handleNewTask = () => {

    if(newItem.current.value === '')
      return;
    const newList = list.concat({
      done: false,
      item: newItem.current.value,
    });
    newItem.current.value = '';
    setList(newList);
  }
  const handleDoneTask = (key) => {
    list[key].done = !list[key].done;
    const newList = list.concat([]);
    setList(newList);
  }
  const handleDeleteTask = (key) => {
    list.splice(key, 1);
    const newList = list.concat([]);
    setList(newList);
  }
  return (
    <div className="p-4 max-w-lg mx-auto">
      <header className="App-header text-lg font-bold">
        TODO LIST
      </header>
      <main>
          <div className="flex my-3">
            <input ref={newItem} type="text" className="border rounded px-2 mr-4 flex-1 " placeholder="add todo" />
            <button onClick={() => handleNewTask()} className="border border-blue-500 text-blue-500 rounded px-4 px-2">add</button>
          </div>
          {
            list.length === 0 && <div className="text-gray-400">do something...</div>
          }
          {
            list.length > 0 && <>
                <section className="my-5">
                <header className="font-medium">Todo</header>
                <div>
                    {
                      list.map((item, key) => {
                          let itemKey = `key_${key}`;
                          if(item.done) return null;
                          return(
                              <div key={itemKey} className="flex items-center py-4 border-b">
                                <div className="cursor-pointer">
                                  <span onClick={() => handleDoneTask(key)} className="block rounded-full border h-4 w-4  border-gray-500"></span>
                                </div>
                                <div className="px-3 flex-1">{item.item}</div>
                                <div className="text-sm">
                                  <TrashIcon onClick={() => handleDeleteTask(key)}  className="cursor-pointer inline-block h-5 w-5 text-gray-500" />  
                                </div>
                              </div>
                          )
                      })
                    }
                </div>
              </section>
              <section>
                <header className="font-medium">Done</header>
                <div>
                    {
                      list.map((item, key) => {
                          let itemKey = `key_${key}`;
                          if(!item.done) return null;
                          return(
                              <div key={itemKey} className="flex items-center py-4 border-b">
                                <div onClick={() => handleDoneTask(key)}>
                                  <CheckCircleIcon className="cursor-pointer h-5 w-5 text-blue-500"  />
                                </div>
                                <div className="px-2 flex-1">{item.item}</div>
                              </div>
                          )
                      })
                    }
                </div>
              </section>
            </>
          }
          </main>
    </div>
  );
}

export default App;
