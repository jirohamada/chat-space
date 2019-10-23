# Chat Space DB設計
## usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false, add_index|
|email|stiring|null: false|
|passwprd|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through :groups_users

## messegesテーブル
|Column|Type|Option|
|------|----|------|
|body|text||
|image|string||
|date|datetime||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Option|
|------|----|------|
|groupname|string|null: false, add_index|
|message_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
### Association
- has_many :message
- has_many :groups_users
- has_many :users, through :groups_users
