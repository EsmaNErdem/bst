class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(!this.root) {
      this.root = new Node(val)
      return this
      //return this refers to the current instance of the BinarySearchTree object.
      // This allows for method chaining, where you can call other methods on the same object immediately after the insertion.
    }
    let curr = this.root
    while(true) {
      if(curr.val > val) {
        if(!curr.left) {
          curr.left = new Node(val)
          return this
        } else {
          curr = curr.left
        }
      } else if (curr.val < val) {
        if(!curr.right) {
          curr.right = new Node(val)
          return this
        } else {
          curr = curr.right
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, curr=this.root) {
    if(!this.root) {
      this.root = new Node(val)
      return this
    }
    if(curr.val > val) {
      if(!curr.left) {
        curr.left = new Node(val)
        return this
      } 
      return this.insertRecursively(val, curr.left)
    } else if (curr.val < val) {
      if(!curr.right) {
        curr.right = new Node(val)
        return this
      } 
      return this.insertRecursively(val, curr.right)
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let curr = this.root

    while (curr) {
      if (val === curr.val) return curr
      if(curr.val > val) {
        curr = curr.left
      } else if (curr.val < val){
        curr = curr = curr.right
      } else {
        return undefined
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, curr = this.root) {
    if(!curr) return undefined
    if (val === curr.val) return curr
    if(curr.val > val) {
      if(curr.left) return this.findRecursively(val, curr.left)
    } else if (curr.val < val){
      if(curr.right) return this.findRecursively(val, curr.right)
    } 
    return undefined;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let res = []
    let curr = this.root

    function traverse(node) {
      res.push(node.val)
      if(node.left) traverse (node.left)
      if(node.right) traverse (node.right)
    }
    traverse(curr)
    return res
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let res = []
    let curr = this.root

    function traverse(node) {
      if(node.left) traverse (node.left)
      res.push(node.val)
      if(node.right) traverse (node.right)
    }
    traverse(curr)
    return res
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let res = []
    let curr = this.root

    function traverse(node) {
      if(node.left) traverse (node.left)
      if(node.right) traverse (node.right)
      res.push(node.val)
    }
    traverse(curr)
    return res
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let curr = this.root
    let res = []
    let queue = []
    queue.push(curr)
    while(queue.length) {
      curr = queue.shift()
      res.push(curr.val)
      if(curr.left) queue.push(curr.left)
      if(curr.right) queue.push(curr.right)
    }

    return res
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    // LEETCODE 450


//     # Definition for a binary tree node.
// # class TreeNode(object):
// #     def __init__(self, val=0, left=None, right=None):
// #         self.val = val
// #         self.left = left
// #         self.right = right
// class Solution(object):
//     def deleteNode(self, root, key):
//         """
//         :type root: TreeNode
//         :type key: int
//         :rtype: TreeNode
//         """
//         if not root:
//             return None  

//         if key > root.val:
//             root.right = self.deleteNode(root.right, key)
//         elif key < root.val:
//             root.left =  self.deleteNode(root.left, key)
//         # in the case of finding the right node
//         else:
//             # if curr node doesn't have a left node
//             if not root.left:
//                 return root.right
//             # curr node doesn't have a right node
//             if not root.right:
//                 return root.left
//             # if curr node has left and right, find a successor which next right's furthest left. next big node's smallest value
//             if root.right and root.left:
//                 successor = root.right
//                 while successor.left:
//                     successor = successor.left

//                 root.val = successor.val

//                 # now update the righ subtree with removed successor node
//                 root.right = self.deleteNode(root.right, successor.val)
//         return root
  }


  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(curr = this.root) {
    if(!curr) return
    return maxDepth(curr) - minDepth(curr) <= 1

    function maxDepth(node) {
      if (!node) return 0
      return Math.max(maxDepth(node.left), maxDepth(node.right)) + 1 
    } 

    function minDepth(node) {
      if (!node) return 0
      return Math.min(minDepth(node.left), minDepth(node.right)) + 1 
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(curr = this.root) {
    if(!curr) return
    if(!curr.right && !curr.left) return

    while (curr) {
      // if curr doesn't have right anymore, then you're on the largest, find the second largest on the left subtree
      if(curr.left && !curr.right) return self.findSecondHighest(curr.left)
      // parent of right-most leaf node is the second largest node
      if(curr.right && (!curr.right.right && !curr.right.left)) return curr.val

      curr = curr.right
    }
  }

  dfsInOrderIterative() {
    let res = []
    let stack = []
    let curr = this.root

    while(stack.length) {
      while(curr) {
        stack.push(curr)
        curr = curr.left
      }

      curr = stack.pop
      if(curr) {
        res.push(curr)
        curr = curr.right
      }
    }
    return res
  }
}

module.exports = BinarySearchTree;
