from collections.abc import Callable
from time import sleep
from typing import TypeVar

import requests

T = TypeVar("T")


def retry_call(
    fn: Callable[[], T],
    *,
    retries: int = 3,
    delay_seconds: float = 1.0,
    backoff: float = 2.0,
    retry_exceptions: tuple[type[BaseException], ...] = (requests.RequestException,),
    on_retry: Callable[[int, BaseException], None] | None = None,
) -> T:
    attempt = 0
    current_delay = delay_seconds
    while True:
        try:
            return fn()
        except retry_exceptions as err:
            attempt += 1
            if attempt >= retries:
                raise
            if on_retry:
                on_retry(attempt, err)
            sleep(current_delay)
            current_delay *= backoff
