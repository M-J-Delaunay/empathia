const { AccessToken } = require('livekit-server-sdk');

exports.handler = async (event) => {
  // On récupère les clés que vous avez mises dans Netlify
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;
  
  // On donne un nom à la salle (ex: "Salon Empathia")
  const roomName = "salon-empathia";
  // On donne un nom aléatoire à l'utilisateur
  const participantName = "Ami-" + Math.floor(Math.random() * 1000);

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
  });
  
  at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

  return {
    statusCode: 200,
    body: JSON.stringify({ token: await at.toJwt() }),
  };
};
