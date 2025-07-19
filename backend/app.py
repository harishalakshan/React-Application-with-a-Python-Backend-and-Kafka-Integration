from flask import Flask, request, jsonify
from kafka import KafkaProducer, KafkaConsumer
import threading
import json

app = Flask(__name__)
producer = KafkaProducer(bootstrap_servers='localhost:9092',
                         value_serializer=lambda v: json.dumps(v).encode('utf-8'))

consumer = KafkaConsumer(
    'message_topic',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='my-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

messages = []

def consume_messages():
    for message in consumer:
        messages.append(message.value)

@app.route('/send', methods=['POST'])
def send():
    data = request.json
    producer.send('message_topic', data)
    return jsonify({"status": "Message sent"}), 200

@app.route('/receive', methods=['GET'])
def receive():
    return jsonify(messages), 200

if __name__ == '__main__':
    threading.Thread(target=consume_messages, daemon=True).start()
    app.run(debug=True)