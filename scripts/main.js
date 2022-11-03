
class ColorPicker {
  constructor(querySelector){
    this.querySelector = querySelector;
    this.boxPicker =  new iro.ColorPicker(this.querySelector, {
      layoutDirection: "horizontal",
    });
    this.values = document.getElementById('values');

    this.boxPicker.on(['mount', 'color:change'], color => this._selectedColor(color))
  }

  _selectedColor(color){
    this.values.innerHTML = `
      <div>
        <p>Value</p>
        <span id="color" style="background-color: ${color.hexString || "#fff"}"></span>
        <span>RGB: ${color.rgbString || "rgb(255, 255, 255)"} </span>
        <span>HEX: ${color.hexString || "#ffffff"} </span>
        <span>HSL: ${color.hslString || 	"hsl(180, 0%, 100%)"} </span>
      </div>
    `;
    document.getElementById('color').addEventListener("click", () => this._copyColor(color))
    document.getElementById('picker').appendChild(this.values)
  }

  _copyColor(color){
    if(color.hexString !== undefined){
      navigator.clipboard.writeText(color.hexString)
      this._copyAlert();
    }
    else{
      navigator.clipboard.writeText("#ffffff")
      this._copyAlert();
    }
  }

  _copyAlert(){
    const alertElem = document.getElementById('alert');
    alertElem.style.display = "block";

    const myTimeout= setTimeout(() => {
      alertElem.style.display = "none";
    }, 1000)
  }

}

const colorPicker = new ColorPicker("#picker");