let localStream;
let remoteStream;
let peerConnection;

let init = async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        document.getElementById('user-1').srcObject = localStream;
        createPeerConnection();
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}


let createPeerConnection = () => {
    peerConnection = new RTCPeerConnection();

    // Add local stream to the peer connection
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    // Set up the remote stream display
    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    // Set up event handlers for the peer connection
    peerConnection.onicecandidate = handleIceCandidate;
    peerConnection.ontrack = handleRemoteTrack;
    peerConnection.onnegotiationneeded = createOffer;

    createOffer();
}

let createOffer = async () => {
    try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        console.log('Offer:', offer);
        // You can send the offer to the remote peer using a signaling mechanism
    } catch (error) {
        console.error('Error creating offer:', error);
    }
}

let handleIceCandidate = (event) => {
    if (event.candidate) {
        // You can send the ICE candidate to the remote peer using a signaling mechanism
    }
}

let handleRemoteTrack = (event) => {
    // Add the incoming remote track to the remoteStream
    remoteStream.addTrack(event.track);
}

init();
