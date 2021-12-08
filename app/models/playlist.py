from .db import db
from .playlist_songs import playlist_songs

class Playlist(db.Model):
    __tablename__ = 'playlists'

    id= db.Column(db.Integer, primary_key=True)
    playlist_name = db.Column(db.String(50), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    users = db.relationship('User', back_populates='playlists')

    songs = db.relationship('Song', back_populates='playlists', secondary=playlist_songs)

    def to_dict(self):
        return {
            'id': self.id,
            'playlist_name': self.playlist_name,
            'owner_id': self.owner_id
        }