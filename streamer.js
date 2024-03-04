 ////////////////////////////////////////////////
    ////////////// VARIABLES ///////////////////////
    ////////////////////////////////////////////////
  
    // This variable will hold the WebSocket client connection. 
    // Initialize in the init() function
    let wsClient;
    const PORT = 5500;
    ////////////////////////////////////////////////
    //////////////// DOM SETUP /////////////////////
    ////////////////////////////////////////////////
    
    const sendButton = document.getElementById('streamButton');
    const videoElement = document.getElementById('video');


    ////////////////////////////////////////////////
    ////////////// WS CLIENT LOGIC /////////////////
    ////////////////////////////////////////////////

    function init() {


      // If a WebSocket connection exists already, close it
      
      if (wsClient) {
        wsClient.onerror = wsClient.onopen = wsClient.onclose = null;
        wsClient.close();
      }

      wsClient = new WebSocket('ws://localhost:' + PORT);
      console.log(navigator.mediaDevices.enumerateDevices());
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        // Ihr Code
        videoElement.srcObject = stream;
    }).catch(error => {
        // Fehlerbehandlung
        alert(error.name);
    });
      console.log(captureImageFromVideo(videoElement));


      wsClient.onopen = () => {
           sendButton.addEventListener('click', () => {
            for( let i = 0 ; i<1000; i++) {
              const imageBase64 = captureImageFromVideo(videoElement);
              //console.log(imageBase64);
              wsClient.send(imageBase64);
            } 
          });
      }

      wsClient.onmessage = function(event)  {
      };


      /* Note:
      The event handlers below are useful for properly cleaning up a closed/broken WebSocket client connection.
      To read more about them, check out the WebSocket API documentation: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
      */

      // .onclose is executed when the socket connection is closed
      wsClient.onclose = (event) => {
        wsClient = null;
      }

      // .onerror is executed when error event occurs on the WebSocket connection
      wsClient.onerror = (event) => {
        console.error("WebSocket error observed:", event);
        wsClient = null;
      }
    }

    ////////////////////////////////////////////////
    //////////// DOM HELPER FUNCTIONS //////////////
    ////////////////////////////////////////////////

    function captureImageFromVideo(videoElement) {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 600;
        //console.log(canvas.width , canvas.height);
        const context = canvas.getContext('2d');
        context.drawImage(videoElement, 0, 0);
        //console.log(canvas.toDataURL('image/jpeg'));
        return canvas.toDataURL('image/jpeg'); // Konvertiert das Bild in einen Base64-String
      }
      
    // Start the WebSocket server
    init();