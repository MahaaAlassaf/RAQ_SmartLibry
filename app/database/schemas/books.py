# books.py
from sqlalchemy import Column, Float, String, Integer
from sqlalchemy.orm import relationship
from app.database.schemas.base import Base
from app.database.schemas.favorite_books import favorite_books
from app.database.schemas.user import User  # Ensure this import is correct

class Book(Base):
    __tablename__ = 'books'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    subtitle = Column(String, index=True)
    thumbnail = Column(String)
    genre = Column(String)
    published_year = Column(Integer)
    description = Column(String)
    average_rating = Column(Float)
    num_pages = Column(Integer)
    ratings_count = Column(Integer)

    # Relationship to Author through the association table
    authors = relationship("Author", secondary="book_author_association", back_populates="books")
    
    # Relationship to User through the association table
    fans = relationship('User', secondary=favorite_books, back_populates='favorite_books')
    
    def __repr__(self):
        return f"id: {self.id}, title: {self.title}"
