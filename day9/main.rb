require 'set'

class RopeBridgeSolver
  def initialize(input, num_knots)
    @input = input
    @num_knots = num_knots 

    @knots = Array.new
    @visited = Set.new
    @i_head = 0
    @i_tail = @num_knots - 1

    init_knots
  end

  def init_knots
    @num_knots.times do |i|
      @knots[i] = "0_0"
    end
  end

  def unhash(hash)
    hash.split("_").map { |n| n.to_i }
  end

  def hash(x, y)
    x.to_s + "_" + y.to_s
  end

  def move_head(direction)
    head_x, head_y = unhash(@knots[@i_head])

    head_x += 1 if direction == "R"
    head_x -= 1 if direction == "L"
    head_y += 1 if direction == "D"
    head_y -= 1 if direction == "U"

    @knots[@i_head] = hash(head_x, head_y)
  end

  def solve
    @input.each_line do |line|
      direction, steps = line.split(" ")
      i = steps.to_i

      while i != 0 do
        move_head(direction)

        i_first = @i_head
        i_last  = @i_head + 1

        (@num_knots - 1).times do |j|
          first_x, first_y = unhash(@knots[i_first])
          last_x, last_y   = unhash(@knots[i_last])

          if (first_x - last_x).abs > 1 or (first_y - last_y).abs > 1 then
            if first_x != last_x and first_y != last_y then
              if first_x > last_x then last_x += 1
              else last_x -= 1
              end

              if first_y > last_y then last_y += 1
              else last_y -= 1
              end

            elsif first_x != last_x then
              if first_x > last_x then last_x += 1
              else last_x -= 1
              end
            elsif first_y != last_y then
              if first_y > last_y then last_y += 1
              else last_y -= 1
              end
            end
          end
          @knots[i_last] = hash(last_x, last_y)
          i_first += 1
          i_last += 1
        end

        @visited.add(@knots[@i_tail])
        i -= 1
      end
    end
    @visited.size.to_s
  end
end

input = File.read(__dir__ + '/input')

puts "Answer to part 1: " << RopeBridgeSolver.new(input, 2).solve()
puts "Answer to part 1: " << RopeBridgeSolver.new(input, 10).solve()
