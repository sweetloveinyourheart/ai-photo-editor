import redis
from dotenv import load_dotenv
import os

load_dotenv()
redis_host = os.getenv("REDIS_HOST")
redis_port = os.getenv("REDIS_PORT")

# Initialize Redis client
redis_client = redis.Redis(host=redis_host, port=redis_port, db=0)

# Rate limit function
def rate_limit(limit_key: str):
    key = f"rate_limit:{limit_key}"
    ttl = 86400  # 24 hours in seconds

    # Increment the number of requests and set the expiration time
    pipeline = redis_client.pipeline()
    pipeline.incr(key)
    pipeline.expire(key, ttl)
    pipeline.execute()

    # Allow the request
    return True

def limit_check(limit_key: str, limit: int = 10):
    key = f"rate_limit:{limit_key}"
    current_requests = redis_client.get(key)

    if current_requests is not None and int(current_requests) >= limit:
        # Rate limit exceeded
        return False

    # Allow the request
    return True