import { readEmployeeDataFromCsv } from './util/Utils';

function App() {
  const handleSelectedFile = () => {
    const reader = new FileReader()
    const [file] = document.querySelector("input[type=file]").files;
    let data = []

    reader.addEventListener(
      "load",
      () => {
        data = reader.result.replaceAll(' ', '').replace(/[\r]/gm, '').split('\n');
        readEmployeeDataFromCsv(data);
      },
      false,
    );

    if (file) {
      reader.readAsBinaryString(file);
    }
  }


  return (
    <div className="App">
      <label>Choose a profile picture:</label>

      <input id="csv" type="file" accept=".csv" onChange={handleSelectedFile} />
      <button type="button" id="btn">Process</button>
    </div>
  );
}

export default App;
