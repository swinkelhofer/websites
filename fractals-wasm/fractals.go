package main

import (
    "syscall/js"
	"strconv"
	"math"
	"encoding/base64"
)

func squareadd(zReal1 float64, zImag1 float64, zReal2 float64, zImag2 float64) (float64, float64) {
	return (zReal1 - zImag1) * (zReal1  - zImag1) + zReal2, 2*zReal1 * zImag2 + zImag2
}



func render(canvas js.Value, real float64, imag float64, topleft map[string]float64, bottomright map[string]float64) []byte {

	width :=  canvas.Get("width").Int()
	height := canvas.Get("height").Int()

	var xMult = float64(width)/(bottomright["x"]-topleft["x"])
	var yMult = float64(height)/(topleft["y"]-bottomright["y"])
	var maxCount = 100

	var tmpX, tmpY float64
	var buffer = make([]byte, width*height*4)
	for x := 0; x < width; x++ {
		tmpX = topleft["x"] + float64(x)/xMult
		for y := 0; y < height; y++ {
			count := 0;
			tmpY = topleft["y"] + float64(y)/yMult
			for tmpX * tmpX + tmpY * tmpY < 4 && count <= maxCount {
				count++
				tmpX, tmpY = squareadd(tmpX, tmpY, real, imag)
			}
			base := ((y * width) + x) * 4
			if count < maxCount {
				buffer[base] = byte(0)
				buffer[base+1] = byte(0)
				buffer[base+2] = byte(int(math.Log(float64(count)) * 50))
				buffer[base+3] = byte(255)
				//context.Call("putImageData", output, (x+math.Abs(topleft["x"]))*xMult, (y+math.Abs(bottomright["y"]))*yMult)
			} else {
				buffer[base] = byte(0)
				buffer[base+1] = byte(0)
				buffer[base+2] = byte(0)
				buffer[base+3] = byte(255)
				//context.Call("putImageData", output, (x+math.Abs(topleft["x"]))*xMult, (y+math.Abs(bottomright["y"]))*yMult)
			}
		}
	}
	println("Finished")
	return buffer
}


func runJulia(this js.Value, i []js.Value) interface{} {
	var real, imag float64;
	var err error
    realString := js.Global().Get("document").Call("getElementById", "real").Get("value").String()
	imagString := js.Global().Get("document").Call("getElementById", "imag").Get("value").String()
	
    println(realString)
	println(imagString)
	
	canvas := js.Global().Get("document").Call("getElementById", "myCanvas")

	if real, err = strconv.ParseFloat(realString, 64); err != nil {
		real = -0.63
	}
	if imag, err = strconv.ParseFloat(imagString, 64); err != nil {
		imag = 0.4
	}

	var topleft = map[string]float64{
		"x":-1.5,
		"y": 1.0,
	}
	
	var bottomright = map[string]float64{
		"x": 1.5,
		"y": -1.0,
	}

	buffer := render(canvas, real, imag, topleft, bottomright)
	pixelBuffer := base64.StdEncoding.EncodeToString(buffer)
	

    return pixelBuffer
}

func registerCallbacks() {
    js.Global().Set("runJulia", js.FuncOf(runJulia))
}

func main() {
    c := make(chan struct{}, 0)

    println("WASM Go Initialized")
    // register functions
    registerCallbacks()
    <-c
}