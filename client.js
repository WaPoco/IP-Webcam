    ////////////////////////////////////////////////
    ////////////// VARIABLES ///////////////////////
    ////////////////////////////////////////////////
  
    // This variable will hold the WebSocket client connection. 
    // Initialize in the init() function
    let wsClient;
    // const username = prompt('Username:'); 
    const PORT = 5500;
    ////////////////////////////////////////////////
    //////////////// DOM SETUP /////////////////////
    ////////////////////////////////////////////////
    
    //const sendButton = document.getElementById('sendButton');
    

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


      wsClient.onopen = () => {
        /*
        document.getElementById('imageInput').addEventListener('change', function(event) {
           const file = event.target.files[0];
           const reader = new FileReader();
           reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            console.log(arrayBuffer.byteLength);
            wsClient.send(arrayBuffer);
            console.log(username+" hat ein Bild abgeschickt!");
           }
           sendButton.addEventListener('click', () => {
            reader.readAsArrayBuffer(file);
          });
        });
        */
      }
      wsClient.onmessage = function(event)  {
        /*
        const mimeType = 'image/jpeg'; // oder ein anderer MIME-Typ, je nach Ihren Daten
        const blob = new Blob([event.data], {type: mimeType});
        // Nun können Sie das Blob-Objekt verwenden, z.B. um es in einem <img> Element anzuzeigen
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        document.getElementById('imagePreview').src = imageUrl;
        */
        const imageBase64 = event.data;
        console.log(imageBase64);
        const imageElement = document.querySelector('img');
        imageElement.src = imageBase64;
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

    // Start the WebSocket server
    init();
