---
lang: 'ko'
slug: '/76DCE9'
---

from dataclasses import dataclass
from typing import Optional
from level3 import ChatResponse

@dataclass
class ChatData:
"""Placeholder for cached chat data (e.g. KV cache) - we only represent the metadata, not the actual data."""

    chat_id: str
    last_timestamp: int

class Server:
"""A server with some system RAM and some GPU RAM (VRAM).

    Attributes:
        vram_chats: Dict mapping chat_id to ChatData for chats in VRAM.
        ram_chats: Dict mapping chat_id to ChatData for chats in system RAM.
        max_vram_chats: Maximum number of entries in vram_chats.
        max_ram_chats: Maximum number of entries in ram_chats.
        num_cache_hits: Counter updated by handle_request for cache hits.
        num_cache_misses: Counter updated by handle_request for cache misses.
        is_online: If False, handle_request must fail.
    """

    vram_chats: dict
    ram_chats: dict
    max_vram_chats: int
    max_ram_chats: int
    num_cache_hits: int
    num_cache_misses: int
    is_online: bool

    def __init__(self, max_vram_chats: int, max_ram_chats: int):
        """Initialize the server with specified memory capacities.

        Args:
            max_vram_chats: Maximum number of chats that fit in VRAM.
            max_ram_chats: Maximum number of chats that fit in system RAM.
        """
        assert max_vram_chats > 1, "system requires at least 2 to function"
        assert max_ram_chats > 1, "system requires at least 2 to function"
        self.max_vram_chats = max_vram_chats
        self.max_ram_chats = max_ram_chats
        self.num_cache_hits = 0
        self.num_cache_misses = 0
        self.is_online = True
        self.vram_chats = {}
        self.ram_chats = {}

    @property
    def total_chats(self) -> int:
        """Return the total number of chats in both VRAM and RAM."""
        pass

    def has_chat(self, chat_id: str) -> bool:
        """Return True if a chat exists in either VRAM or RAM.

        It should never be possible for a chat to exist in both.

        Args:
            chat_id: Unique identifier for the chat.

        Returns:
            True if the chat exists in VRAM or RAM, False otherwise.
        """
        pass

    def remove_chat(self, chat_id: str) -> Optional[ChatData]:
        """Remove the chat from the server, freeing up memory.

        Args:
            chat_id: Unique identifier for the chat.

        Returns:
            Any chat data this server had, or None if chat not found.
        """
        pass

    def shutdown(self) -> None:
        """Set the server to offline and clear all chats.

        Raises:
            RuntimeError: If the server is already offline.
        """
        pass

    def handle_request(
        self, chat_id: str, timestamp: int, message: str
    ) -> ChatResponse:
        """Reply to a user's chat message.

        If the server is offline, return ChatResponse with success=False.

        First, increment the cache hit counter if the chat was in RAM or VRAM.
        Otherwise increment the cache miss counter.
        Then create or update the ChatData instance.

        Finally, return ChatResponse with success=True and any response (we aren't actually simulating the LLM here).

        Args:
            chat_id: Unique identifier for the chat.
            timestamp: Current timestamp - guaranteed to be monotonically increasing.
            message: The user's message.

        Returns:
            ChatResponse with success=True and llm_reply string if successful,
            or success=False if the server is offline.
        """
        pass
