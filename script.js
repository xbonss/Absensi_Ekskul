let data = JSON.parse(localStorage.getItem("absenEkskul")) || []

function tampil(){

let tbody=document.querySelector("#tabel tbody")
tbody.innerHTML=""

data.forEach((d,i)=>{

let row=`
<tr>
<td>${i+1}</td>
<td>${d.nama}</td>
<td>${d.kelas}</td>
<td>${d.ekskul}</td>
<td>${d.waktu}</td>
</tr>
`

tbody.innerHTML+=row

})

}

function tambah(){

let nama=document.getElementById("nama").value
let kelas=document.getElementById("kelas").value
let ekskul=document.getElementById("ekskul").value

if(nama==""||kelas==""||ekskul==""){
alert("Isi semua data")
return
}

let waktu=new Date().toLocaleString()

data.push({nama,kelas,ekskul,waktu})

localStorage.setItem("absenEkskul",JSON.stringify(data))

tampil()

}

function exportCSV(){

let csv="No,Nama,Kelas,Ekskul,Waktu\n"

data.forEach((d,i)=>{
csv+=`${i+1},${d.nama},${d.kelas},${d.ekskul},${d.waktu}\n`
})

let blob=new Blob([csv],{type:"text/csv"})
let url=URL.createObjectURL(blob)

let a=document.createElement("a")
a.href=url
a.download="absensi-ekskul.csv"
a.click()

}

function buatQR(){

let nama=document.getElementById("namaQR").value
let kelas=document.getElementById("kelasQR").value
let ekskul=document.getElementById("ekskulQR").value

let dataQR = nama+" | "+kelas+" | "+ekskul

document.getElementById("qrcode").innerHTML=""

new QRCode(document.getElementById("qrcode"),{
text:dataQR,
width:200,
height:200
})

}

function onScanSuccess(decodedText){

let waktu=new Date().toLocaleString()

let bagian = decodedText.split(" | ")

data.push({
nama:bagian[0],
kelas:bagian[1],
ekskul:bagian[2],
waktu:waktu
})

localStorage.setItem("absenEkskul",JSON.stringify(data))

tampil()

}

let scanner = new Html5QrcodeScanner(
"reader",
{ fps: 10, qrbox: 250 })

scanner.render(onScanSuccess)

tampil()