      const input = document.getElementById('imageUpload')
      const canvas = document.getElementById('certificateCanvas')
      const img = new Image();
      const ctx = canvas.getContext('2d');
      const sections = [];
      let imgFlag = false
      let excelobjs=[]


      const { jsPDF } = window.jspdf;
      const minBoxSize = 50;

      input.addEventListener('change',(event)=>
      {
          const file = event.target.files[0];
          if(!file) return;
          
          const reader = new FileReader();  
          reader.onload = (e)=>
          {
              img.onload = () =>
              {
                    canvas.width = img.naturalWidth
                    canvas.height = img.naturalHeight
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);

                    showMenu();
                    imgFlag = true
                
              }
              img.src = e.target.result;
          }
          reader.readAsDataURL(file);
      })


    const excelinput = document.getElementById('excelUpload');

    excelinput.addEventListener("change",(e)=>
    {
        var file = e.target.files[0];
        let excelarray = [];  
        if(!file) return;

        const freader = new FileReader();

        freader.onload = (e)=>
        {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data,{type:'buffer'})
            var sheetname = workbook.SheetNames[0];
            var sheet = workbook.Sheets[sheetname];

            const result = XLSX.utils.sheet_to_json(sheet,{header:1});
            excelarray = result;   
            const headers = excelarray[0].map(h => h ? h.toString().trim() : h);   

            for(let i=1;i<excelarray.length;i++)
              {  
                  const row = excelarray[i];
                  const isEmpty = row.every(cell => cell === undefined || cell === null || cell === '');

                  if (isEmpty) break; 
                  
                  let excelEntry = {}

                  for(let j=0;j<headers.length;j++)
                  {
                    excelEntry[headers[j]] = row[j];

                    
                  }

                  excelobjs.push(excelEntry);
              }

            console.log(excelobjs)
        }

        freader.readAsArrayBuffer(file);

    })



      let isDrawing = false;
      let startX = 0,
        startY = 0,
        rectWidth = 0,
        rectHeight = 0;

      let fontSettings = {
        fontSize: 100,
        fontFamily: "Arial",
        color: "black",
        field:""
      };



      canvas.addEventListener("mousedown", (e) => {
        
        if (!imgFlag) return;
        e.preventDefault()
        const rect = canvas.getBoundingClientRect();
        startX = (e.clientX - rect.left) * (canvas.width / rect.width);
        startY = (e.clientY - rect.top) * (canvas.height / rect.height);
        rectWidth=0;
        rectHeight=0;
        isDrawing = true;
      });

      canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        if (!imgFlag) return;

        e.preventDefault()
        const rect = canvas.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
        rectWidth = mouseX - startX;
        rectHeight = mouseY - startY;
      

        if(Math.abs(rectWidth)>minBoxSize && Math.abs(rectHeight)>minBoxSize)
        {
        ctx.drawImage(img, 0, 0);
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.strokeRect(startX, startY, rectWidth, rectHeight);

        }

      });

      canvas.addEventListener("mouseup", async (e) => {
        if (!isDrawing || !imgFlag) return;
        isDrawing = false;
        

        e.preventDefault()
        if(Math.abs(rectWidth)>minBoxSize && Math.abs(rectHeight)>minBoxSize)
        {
         
        await document.fonts.ready; 
        await document.fonts.load(`${fontSettings.fontSize}px ${fontSettings.fontFamily}`);

        ctx.font = `${fontSettings.fontSize}px ${fontSettings.fontFamily}`;

        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const centerXaxis = startX+rectWidth/2
        const centerYaxis = startY+rectHeight/2
        ctx.fillText(fontSettings.field,centerXaxis,centerYaxis)
        
        showPopup();
      }

      });

      const sizechanger = document.getElementById("fontsizepicker")
      const colorchanger = document.getElementById("fontcolorpicker")
      const fontfam = document.getElementById("fonttype")
      const textfield = document.getElementById("fieldname")


      sizechanger.addEventListener("change",(e)=>
      {
        fontSettings.fontSize = parseInt(e.target.value)
      })
      colorchanger.addEventListener("change",(e)=>
      {
          fontSettings.color = e.target.value
      })

      fontfam.addEventListener("change",(e)=>
      {
        fontSettings.fontFamily= e.target.value
      })

      textfield.addEventListener("change",(e)=>
      {
          fontSettings.field=e.target.value
      })


      function showMenu() {
        const menu = document.getElementById("myMenu");
        menu.style.display = "block";
      }


      function showPopup() {
        const popupchoice = document.getElementById("popup");
        popupchoice.style.display = "block";
      }

      const savebutton = document.getElementById("validSave");

      savebutton.addEventListener("click",(e)=>
      {
          e.preventDefault()
          
          sections.push({startX,startY,rectWidth,rectHeight,fontSettings:{...fontSettings}})
        
          for(let sec in sections)
        {
          console.log({sec})
        } 

        const currentIndex = sections.length - 1;
        
        const popupchoice = document.getElementById("popup");
        popupchoice.style.display = "none";

        addOverlay(startX,startY,rectWidth,rectHeight,fontSettings,currentIndex);

      })

      const cancelbutton = document.getElementById("cancelSave")

      cancelbutton.addEventListener('click',(e)=>
      {
        e.preventDefault();
          const popupchoice = document.getElementById("popup");
          popupchoice.style.display = "none";
      })

    const addOverlay = (x, y, width, height, settings,index) => {
        const overlay = document.createElement('div');
        overlay.classList.add('createdarea');
        overlay.style.position = 'absolute';
        overlay.setAttribute('data-index', index);

        const canvas = document.getElementById('certificateCanvas');
        const rect = canvas.getBoundingClientRect();
        const scaleX = rect.width / canvas.width;
        const scaleY = rect.height / canvas.height;
        
      
        overlay.style.left = `${x * scaleX}px`;
        overlay.style.top = `${y * scaleY}px`;
        overlay.style.width = `${Math.abs(width) * scaleX}px`;
        overlay.style.height = `${Math.abs(height) * scaleY}px`;
        
        overlay.style.backgroundColor = 'rgba(150, 236, 239, 0.7)';
        overlay.style.border = '2px solid green';
        overlay.style.fontSize = `${settings.fontSize*Math.min(scaleX,scaleY)}px`;
        overlay.style.fontFamily = settings.fontFamily
        overlay.textContent = settings.field;
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";    
        overlay.style.justifyContent = "center";  
        
        document.getElementById('overlays').appendChild(overlay);
    }



    document.getElementById('overlays').addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('createdarea')) {

            const index = parseInt(e.target.getAttribute('data-index'));

            e.target.remove();

            sections[index] = null;
        

        }
    });


    const generator = document.getElementById("genButton");



    document.getElementById("genButton").addEventListener("click", async (e) => {
      e.preventDefault();

      if (!excelobjs.length) {
        alert("Upload an Excel file first!");
        return;
      }
      if (!imgFlag) {
        alert("Upload a certificate image first!");
        return;
      }

      const validSections = sections.filter(Boolean);
      
      if(validSections.length==0)
      {
        alert("Save Atleast a Valid Section or Text!");
        return;
      }
      const zip = new JSZip();

      
      function capitalizeName(name) {
          if (!name) return "";
          return name.toString().toLowerCase().split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
        }

      for (let i = 0; i < excelobjs.length; i++) {
        const row = excelobjs[i];

        const pdfCanvas = document.createElement("canvas");
        const pdfctx = pdfCanvas.getContext("2d");
        pdfCanvas.width = canvas.width;
        pdfCanvas.height = canvas.height;

        pdfctx.drawImage(img, 0, 0);

        
        
        for (const section of validSections) 
          {
            const fieldLabel = section.fontSettings.field.trim().toLowerCase();
            const textToDraw = (fieldLabel === "name") ? capitalizeName(row["Name"] || row["name"] || "") : section.fontSettings.field;

            if (!textToDraw) continue;

            await document.fonts.ready; 
            await document.fonts.load(`${section.fontSettings.fontSize}px ${section.fontSettings.fontFamily}`);


            pdfctx.font = `${section.fontSettings.fontSize}px ${section.fontSettings.fontFamily}`;
            pdfctx.fillStyle = section.fontSettings.color;
            pdfctx.textAlign = "center";
            pdfctx.textBaseline = "middle";

            const centerX = section.startX + section.rectWidth / 2; 
            const centerY = section.startY + section.rectHeight / 2;

            pdfctx.fillText(textToDraw, centerX, centerY);

          }

        const imgData = pdfCanvas.toDataURL("image/jpeg", 1.0);

     
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);


        const fileName = `${capitalizeName(row["Name"] || row["name"] || "Certificate")}.pdf`;
        const pdfBlob = pdf.output("blob");
        zip.file(fileName, pdfBlob);
      }

      
      const zipName = prompt("Enter ZIP file name:", "Certificates.zip") || "Certificates.zip";

      zip.generateAsync({ type: "blob" }).then(function (blob) {
      alert("Certificates are ready for download.");
      saveAs(blob, zipName);
      })


  } );
