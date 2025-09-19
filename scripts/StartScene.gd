extends Node2D
class_name StartScene

# Start scene - main game scene with character movement and room interaction

@onready var fujimo_character: CharacterBody2D
@onready var furniture_group: Node2D
@onready var interaction_ui: Control

var character_speed := 100.0
var current_direction := Vector2.ZERO
var animation_player: AnimationPlayer

func _ready():
	setup_scene()
	setup_character()
	setup_furniture()
	setup_ui()

func setup_scene():
	# Scene initialization
	name = "StartScene"
	
func setup_character():
	# Create and configure Fujimo character
	fujimo_character = CharacterBody2D.new()
	fujimo_character.name = "FujimoCharacter"
	
	# Add collision shape
	var collision = CollisionShape2D.new()
	var shape = RectangleShape2D.new()
	shape.size = Vector2(32, 48)
	collision.shape = shape
	fujimo_character.add_child(collision)
	
	# Add sprite
	var sprite = Sprite2D.new()
	sprite.name = "Sprite"
	fujimo_character.add_child(sprite)
	
	# Add animation player
	animation_player = AnimationPlayer.new()
	animation_player.name = "AnimationPlayer"
	fujimo_character.add_child(animation_player)
	
	add_child(fujimo_character)
	
	# Position character
	fujimo_character.position = Vector2(512, 190)

func setup_furniture():
	# Create furniture group
	furniture_group = Node2D.new()
	furniture_group.name = "Furniture"
	add_child(furniture_group)
	
	# Add furniture items (PC, chair, wardrobe, etc.)
	create_furniture_item("PC", Vector2(100, 150), "res://assets/sprites/furniture/pc.png")
	create_furniture_item("Chair", Vector2(150, 180), "res://assets/sprites/furniture/chair.png")
	create_furniture_item("Wardrobe", Vector2(200, 120), "res://assets/sprites/furniture/wardrobe.png")
	create_furniture_item("Stove", Vector2(300, 160), "res://assets/sprites/furniture/stove.png")
	create_furniture_item("Table", Vector2(400, 180), "res://assets/sprites/furniture/table.png")
	create_furniture_item("Sink", Vector2(500, 160), "res://assets/sprites/furniture/sink.png")
	create_furniture_item("Fridge", Vector2(600, 140), "res://assets/sprites/furniture/fridge.png")
	create_furniture_item("Bookshelf", Vector2(700, 130), "res://assets/sprites/furniture/bookshelf.png")
	create_furniture_item("TrashBin", Vector2(800, 200), "res://assets/sprites/furniture/trash_bin.png")
	create_furniture_item("Futon", Vector2(900, 250), "res://assets/sprites/furniture/futon.png")

func create_furniture_item(item_name: String, pos: Vector2, texture_path: String):
	var furniture_item = StaticBody2D.new()
	furniture_item.name = item_name
	
	var sprite = Sprite2D.new()
	var texture = load(texture_path) as Texture2D
	if texture:
		sprite.texture = texture
	
	var collision = CollisionShape2D.new()
	var shape = RectangleShape2D.new()
	shape.size = Vector2(64, 64)  # Default size, adjust per furniture
	collision.shape = shape
	
	furniture_item.add_child(sprite)
	furniture_item.add_child(collision)
	furniture_item.position = pos
	
	furniture_group.add_child(furniture_item)

func setup_ui():
	# Create UI for interactions
	interaction_ui = Control.new()
	interaction_ui.name = "InteractionUI"
	add_child(interaction_ui)
	
	var label = Label.new()
	label.text = "Use WASD to move, click objects to interact"
	label.position = Vector2(10, 10)
	interaction_ui.add_child(label)

func _physics_process(delta):
	handle_input()
	move_character(delta)
	update_animations()

func handle_input():
	current_direction = Vector2.ZERO
	
	if Input.is_action_pressed("move_left"):
		current_direction.x -= 1
	if Input.is_action_pressed("move_right"):
		current_direction.x += 1
	if Input.is_action_pressed("move_up"):
		current_direction.y -= 1
	if Input.is_action_pressed("move_down"):
		current_direction.y += 1
	
	current_direction = current_direction.normalized()

func move_character(delta):
	if fujimo_character:
		fujimo_character.velocity = current_direction * character_speed
		fujimo_character.move_and_slide()

func update_animations():
	if not animation_player:
		return
		
	if current_direction.length() > 0:
		# Walking animation based on direction
		if abs(current_direction.x) > abs(current_direction.y):
			if current_direction.x > 0:
				play_animation("walk_right")
			else:
				play_animation("walk_left")
		else:
			if current_direction.y > 0:
				play_animation("walk_down")
			else:
				play_animation("walk_up")
	else:
		# Idle animation
		play_animation("idle")

func play_animation(anim_name: String):
	if animation_player and animation_player.has_animation(anim_name):
		if animation_player.current_animation != anim_name:
			animation_player.play(anim_name)

func _input(event):
	if event is InputEventMouseButton and event.pressed:
		handle_click(event.position)

func handle_click(click_position: Vector2):
	# Handle clicks on furniture or other interactive objects
	print("Clicked at: ", click_position)
	# Add interaction logic here