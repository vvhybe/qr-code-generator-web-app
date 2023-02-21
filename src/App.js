import { useRef, useState } from 'react';
import './styles/App.css';
import QRCode from 'react-qr-code';

function App() {
  const [QR, setQR] = useState("");
  const [input, setInput] = useState("");
  const [QRpng, setQRpng] = useState("");
  const QRref = useRef();

  const generateQRCode = ()=>{
    setQR(input)
  }

  const saveQRCode = ()=>{
    const svgbase64 = URL.createObjectURL(new Blob([QRref.current.outerHTML], { type: "image/svg+xml;charset=utf-8" }))
    const QRCodepng = new Image()
    const a = document.createElement("a")
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d");
    QRCodepng.src = svgbase64;
    QRCodepng.onload = ()=>{
      canvas.height = QRref.current.clientHeight
      canvas.width = QRref.current.clientWidth
      ctx.drawImage(QRCodepng, 0, 0, QRCodepng.width, QRCodepng.height)
      setQRpng(canvas.toDataURL("image/png"))
    }
    a.download = "QRCode"
    a.href = QRpng;
    a.click();
  }

  return (
    <>
    <section>
      <h1><span>QR</span> Code Generator</h1>
      <div className='gnerator'>
        <input type={"text"} onKeyDown={e=> e.key === "Enter" && generateQRCode()} onChange={e=>setInput(e.target.value)} placeholder="e.g https://www.google.com"/>
        <button onClick={generateQRCode}>Generate</button>
      </div>
      {QR && 
      <div className='qrcode'>
        <QRCode onClick={saveQRCode} width={true} value={QR} size={240} ref={QRref} className="QR"/>
        <p>Click The <span>QR</span> Code to save it</p>
      </div>
      }
      <a className='logo' target={"_blank"} rel="noreferrer" href='https://github.com/whybe7'></a>
    </section>
    <section>
      <div className='applogo'></div>
      <a className='download' rel="noreferrer" download={"QRCodeGenerator-v1.0.1"} href="https://github.com/whybe7/QRCodeGenerator/releases/download/v1.0.1/QRCodeGenerator-V1.0.1.apk"><i className="fi fi-brands-android"></i> Download the Android App</a>
    </section>
    </>

  );
}

export default App;
