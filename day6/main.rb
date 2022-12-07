input = File.read(__dir__ + '/input')

def get_number_of_chars_before_marker(str, markerLength)
  charsProcessed = 0
  potentialMarker = Array.new

  str.each_char do |c|
    charsProcessed += 1
    potentialMarker.push(c)

    if potentialMarker.size == markerLength
      return charsProcessed if potentialMarker.uniq.size == markerLength
      potentialMarker.shift()
    end
  end
end

puts "Answer to part 1: " + get_number_of_chars_before_marker(input, 4).to_s
puts "Answer to part 2: " + get_number_of_chars_before_marker(input, 14).to_s
