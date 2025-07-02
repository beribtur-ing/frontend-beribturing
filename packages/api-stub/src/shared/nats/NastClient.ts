import {connect, NatsConnection, StringCodec, Subscription} from 'nats.ws';

let nc: NatsConnection | null = null;

const sc = StringCodec();

export async function initNatsClient(serverUrl: string): Promise<NatsConnection> {
  if (!nc || nc.isClosed()) {
    nc = await connect({servers: serverUrl});
    console.log('Connected to NATS:', serverUrl);
  }
  return nc;
}

export async function subscribeToSubject(
  natsServerUrl: string,
  subject: string,
  onMessage: (message: string) => void,
): Promise<() => void> {
  const natsConnection = await initNatsClient(natsServerUrl);
  const sub: Subscription = natsConnection.subscribe(subject);
  console.log(`Subscribed to subject: ${subject}`);
  
  await (async () => {
    for await (const msg of sub) {
      const decoded = sc.decode(msg.data);
      onMessage(decoded);
    }
  })();
  
  // Return cleanup function
  return () => {
    try {
      sub.unsubscribe();
      console.log(`Unsubscribed from subject: ${subject}`);
    } catch (error) {
      console.warn(` Failed to unsubscribe: ${subject}`);
    }
  };
}
