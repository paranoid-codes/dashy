export class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(private url: string) {}

  connect(
    onOpen: () => void,
    onMessage: (data: any) => void,
    onError: (error: Event) => void,
    onClose: () => void,
    onConnecting?: () => void
  ) {
    try {
      // Notify that we're attempting to connect
      onConnecting?.();

      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        this.reconnectAttempts = 0;
        // Clear any pending reconnect timeout
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout);
          this.reconnectTimeout = null;
        }
        onOpen();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onMessage(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        onError(error);
      };

      this.ws.onclose = (event) => {
        onClose();
        // Only attempt reconnect if it wasn't a manual close
        if (event.code !== 1000) {
          this.attemptReconnect(
            onOpen,
            onMessage,
            onError,
            onClose,
            onConnecting
          );
        }
      };
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      onError(error as Event);
    }
  }

  private attemptReconnect(
    onOpen: () => void,
    onMessage: (data: any) => void,
    onError: (error: Event) => void,
    onClose: () => void,
    onConnecting?: () => void
  ) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = this.reconnectDelay * this.reconnectAttempts;

      console.log(
        `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );

      this.reconnectTimeout = setTimeout(() => {
        this.connect(onOpen, onMessage, onError, onClose, onConnecting);
      }, delay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
      return true;
    }
    console.warn('WebSocket is not connected, cannot send data:', data);
    return false;
  }

  disconnect() {
    // Clear any pending reconnect timeout
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      this.ws.close(1000, 'Manual disconnect'); // 1000 = normal closure
      this.ws = null;
    }

    this.reconnectAttempts = 0;
  }

  getConnectionState(): 'connecting' | 'open' | 'closing' | 'closed' {
    if (!this.ws) return 'closed';

    switch (this.ws.readyState) {
      case WebSocket.CONNECTING:
        return 'connecting';
      case WebSocket.OPEN:
        return 'open';
      case WebSocket.CLOSING:
        return 'closing';
      case WebSocket.CLOSED:
      default:
        return 'closed';
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  fetchFiles() {
    if (!this.send({ type: 'FETCH_FILES' })) {
      console.warn('Cannot fetch files: WebSocket not connected');
    }
  }

  parseFiles(fileIds: string[]) {
    if (!this.send({ type: 'PARSE_FILES', fileIds })) {
      console.warn('Cannot parse files: WebSocket not connected');
    }
  }
}
