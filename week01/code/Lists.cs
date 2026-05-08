using System.Collections.Generic;

public static class Lists
{
    public static void RotateListRight(List<int> data, int amount)
    {
        // Get the last numbers
        List<int> end = data.GetRange(data.Count - amount, amount);

        // Get the first numbers
        List<int> beginning = data.GetRange(0, data.Count - amount);

        // Clear the list
        data.Clear();

        // Add rotated values
        data.AddRange(end);
        data.AddRange(beginning);
    }
}