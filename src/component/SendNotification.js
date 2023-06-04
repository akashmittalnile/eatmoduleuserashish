const sendNotification= async(data)=>{
    const firApiKey="AAAA5TYSar4:APA91bH-_IBpo9IfiG4beQQjvc0YB5pZKgio_VNLE3ZxLsmjVeFyGHuA34ZVYpKUqdjXjogrf2-wdoh7zlGmp-BTykl7qNhAybGNWjcBdw0SDQZsiEasCpKce6CoPTmg4rhK94gQfwNZ"
    const  message={
registration_ids:[data.token], //Devide token
data : data.data,
notification: {
  title: data.title,
  body: data.body,
  "vibrate":1,
  "sound": 1,
  "show_in_foreground": true,
  "priority": "high",
  "content_available": true,
}
  }
  let headers = new Headers({
    "Content-Type": "application/json",
    "Authorization": "key=" + firApiKey
  });

let response = await fetch("https://fcm.googleapis.com/fcm/send", {method: "POST", headers,body: JSON.stringify(message) })
responce = await response.json();
console.log('HIIIII',responce);
 }
  export default {sendNotification}