module.exports = function(RED) {
    function SoapResponseNode(config) {
      var thisNode = this;
      RED.nodes.createNode(thisNode, config);
      
      var responseWrapper = config.wrapper !== "" ? config.wrapper : "payload";
      
      thisNode.on("input", function(msg) {
        var callback = msg["_soapServer_soapResponseCallback"];
        
        if (callback == null) {
          thisNode.warn("No previous soap server found for a soap server response.");
          return;
        }

        var payload = msg.payload;
        callback({[responseWrapper]: payload});
      });
    }
    RED.nodes.registerType("soapresponse", SoapResponseNode);
}  
